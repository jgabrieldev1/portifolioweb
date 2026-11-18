/**
 * Tipos — fumaça escrita em caracteres (arte ASCII em fósforo).
 * Runner WebGL2 mínimo, sem bibliotecas: um triângulo de tela cheia e um fragment shader
 * que desenha glifos 5×7 em bitmap, com bits inteiros em pixels do canvas (nítido em qualquer dpr).
 */

export type TiposPalette = {
  /** corpo da fumaça */
  c1: string;
  /** miolo e letreiro */
  c2: string;
  /** glifos fracos */
  c3: string;
  /** fundo */
  c4: string;
};

export const PHOSPHOR_GREEN: TiposPalette = {
  c1: '#3dff8b',
  c2: '#dcffe8',
  c3: '#0f7a3f',
  c4: '#040a06',
};

const VERTEX = `#version 300 es
void main() { vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }
`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_dpr;
uniform vec2 u_center;
out vec4 o;

// paleta de luz: quente, clara, fria, funda (trocada pelo painel)
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;
#define CORAL u_c1
#define GELO u_c2
#define ANIL u_c3
#define ABISMO u_c4
#define CORAL2 mix(u_c1, u_c4, 0.16)

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
// grão fixo na tela, um valor por pixel (hash inteiro: o de cima repete padrões em coordenadas grandes)
float grain(vec2 p) {
  uvec2 q = uvec2(ivec2(p) + 4096);
  uint h = (q.x * 1597334677u) ^ (q.y * 3812015801u);
  h = (h ^ (h >> 16u)) * 0x45d9f3bu;
  h ^= h >> 16u;
  return float(h) / 4294967295.0;
}

// Tipos: fumaça escrita em caracteres, como arte ASCII num monitor antigo. Um campo de fluxo (fbm torcido por
// outro fbm) é lido célula a célula e vira um glifo da rampa  .:-+=%*#@ ; nas faixas do meio, de vez em quando,
// entra um acento nosso (ç ã é õ á ê ú). Os glifos são bitmaps 5×7 desenhados aqui mesmo, sem textura: 35 bits
// em dois uint por glifo. Cada célula troca de glifo no seu próprio compasso (um atraso aleatório), então a
// fumaça anda tique a tique, sem piscar em bloco. Perto do ponteiro as células embaralham como um letreiro de
// aeroporto (a metade de cima vira antes da de baixo) e se acomodam de volta, uma a uma, quando ele sai.

// rampa 0–9 por densidade, acentos 10–16, letras e números do letreiro 17–23:  .:-+=%*#@ çãéõáêú ARS037Ç
const uint GLO[24] = uint[](0u, 0u, 4096u, 458752u, 1020032u, 31744u, 70003u, 1030816u, 359754u, 718382u, 34752u, 539062u, 571528u, 571830u, 538760u, 571716u, 574600u, 1033774u, 509487u, 459838u, 710446u, 475663u, 139807u, 34350u);
const uint GHI[24] = uint[](0u, 128u, 128u, 0u, 132u, 31u, 429u, 686u, 10591u, 30781u, 6302u, 31294u, 14399u, 14897u, 31294u, 14399u, 23345u, 17969u, 17701u, 15888u, 14965u, 15888u, 2114u, 12753u);

// um bit do glifo g na coluna x (0–4, da esquerda) e linha y (0–6, de cima)
float bit(int g, int x, int y) {
  if (x < 0 || x > 4 || y < 0 || y > 6) return 0.0;
  int i = y * 5 + x;
  uint w = i < 20 ? GLO[g] : GHI[g];
  return float((w >> uint(i < 20 ? i : i - 20)) & 1u);
}

// a fumaça: fbm empurrado por outros dois fbm, subindo devagar em diagonal. Devolve o corpo (x) e os fios (y):
// o vinco 1 - |2f - 1| é alto onde o fbm cruza o meio, o que desenha filetes finos dentro do corpo
vec2 smoke(vec2 p, vec2 m, float t) {
  vec2 dm = p - m;
  p += dm * 0.35 * u_hover * exp(-dot(dm, dm) * 6.0);     // o ponteiro abre a fumaça em volta dele
  vec2 q = p * vec2(2.6, 2.0) + vec2(-t * 1.2, -t * 2.6);
  vec2 w = vec2(fbm(q + vec2(0.0, t)), fbm(q + vec2(5.2, 1.3) - t * 0.7));
  float f = fbm(q * 1.1 + 2.8 * w - vec2(0.0, t));
  float ridge = 1.0 - abs(2.0 * f - 1.0);
  return vec2(f, pow(ridge, 5.0));
}

void main() {
  float asp = u_res.x / u_res.y;
  float t = u_time * 0.05;
  vec2 m = (u_mouse - 0.5) * vec2(asp, 1.0);

  // grade: bit inteiro em pixels do canvas (nítido em qualquer dpr), célula de 6×8 bits (glifo 5×7 + respiro),
  // perto de 12×16 px de CSS
  float s = max(1.0, floor(u_dpr * 1.75 + 0.5));
  vec2 cellPx = vec2(6.0, 8.0) * s;
  vec2 cell = floor(gl_FragCoord.xy / cellPx);
  vec2 lb = floor(mod(gl_FragCoord.xy, cellPx) / s);      // bit dentro da célula, de baixo para cima
  int bx = int(lb.x), by = 6 - int(lb.y - 1.0);           // linha de baixo da célula fica vazia
  vec2 c = (cell + 0.5) * cellPx;
  vec2 p = (c - 0.5 * u_res) / u_res.y;

  float h1 = hash(cell + 3.1), h2 = hash(cell * 1.7 + 11.4), h3 = hash(cell * 0.73 + 27.9);

  // cada célula lê a fumaça no seu próprio tique (4 por segundo, defasados): a troca escorre, não pisca em bloco
  float tq = (floor(u_time * 4.0 + h1) - h1) / 4.0;
  vec2 sm = smoke(p, m, tq * 0.05);

  // região calma para o texto: no paisagem a fumaça mora à direita, subindo em diagonal; no retrato, sobe do pé
  // da tela. A máscara garante a composição em qualquer instante; o fbm só esculpe por dentro dela
  float land = smoothstep(-0.55, 0.75, p.x / asp * 1.7 - p.y * 0.45 + 0.14 * sin(p.y * 3.0 + t * 4.0));
  float port = smoothstep(0.55, -0.5, p.y + 0.1 * sin(p.x * 5.0 + t * 4.0));
  float mask = mix(port, land, smoothstep(0.75, 1.1, asp));
  // a máscara entra como viés no fbm, não como multiplicação: a borda da fumaça fica orgânica, não uma reta
  float v = sm.x + 0.36 * (mask - 0.5);
  float body = smoothstep(0.34, 0.95, v);
  float I = body * (0.55 + 0.45 * body) + sm.y * 0.4 * smoothstep(0.3, 0.6, v);
  I = clamp(I, 0.0, 1.0);

  int lvl = int(clamp(I * 10.0, 0.0, 9.0));
  int g = lvl;
  // acentos nas faixas do meio, poucos, trocando de lugar de tempos em tempos
  if (lvl >= 5 && lvl <= 8 && hash(cell + floor(tq * 0.2 + h2) * 7.3) < 0.13) g = 10 + int(h3 * 6.99);

  // letreiro: perto do ponteiro a célula embaralha; o limiar por célula faz a borda se desfazer aos poucos
  vec2 dp = p - m;
  float S = u_hover * smoothstep(0.34, 0.06, length(dp * vec2(1.0, 1.15)));
  float scr = step(h2 * 0.92 + 0.04, S);
  float rate = 9.0 + 9.0 * h3;
  float ft = u_time * rate + h1 * 17.0;
  float k = floor(ft);
  int gNew = int(hash(cell + k * 0.137) * 23.99);
  int gOld = int(hash(cell + (k - 1.0) * 0.137) * 23.99);
  int gs = (by <= 3 || fract(ft) > 0.5) ? gNew : gOld;    // a aba de cima cai primeiro
  if (scr > 0.5) g = gs;

  float on = bit(g, bx, by);

  // cor: o glifo esquenta e clareia com a densidade; embaralhado, acende
  vec3 ink = mix(ANIL, CORAL, smoothstep(0.1, 0.55, I));
  ink = mix(ink, GELO, smoothstep(0.65, 1.0, I) * 0.8);
  float lum = 0.35 + 0.9 * I;
  ink = mix(ink * lum, mix(CORAL, GELO, 0.55) * 1.05, scr);
  // fósforo: a última linha de pixels de cada bit um pouco mais escura (linha de varredura), só quando dá
  float scan = s >= 3.0 && mod(gl_FragCoord.y, s) < 1.0 ? 0.72 : 1.0;

  // fundo: não é preto chapado; um brilho liso e baixo segue a fumaça por baixo dos glifos
  vec2 pp = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec3 col = ABISMO * 0.75 + CORAL * 0.05 * I + GELO * 0.04 * S;
  col = mix(col, ink * scan, on);
  col *= smoothstep(1.6, 0.35, length(pp * vec2(0.62, 0.9)));
  col += (grain(gl_FragCoord.xy) - 0.5) * 0.015;
  o = vec4(col, 1.0);
}
`;

const hexToRgb = (hex: string): [number, number, number] => {
  const value = parseInt(hex.replace('#', ''), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
};

export type TiposHandle = { dispose: () => void };

/** Monta o fundo dentro de `host` (o canvas entra como primeiro filho). */
export function mountTipos(host: HTMLElement, palette: TiposPalette = PHOSPHOR_GREEN): TiposHandle {
  const canvas = document.createElement('canvas');
  canvas.className = 'tipos-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.insertBefore(canvas, host.firstChild);

  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
  if (!gl) {
    host.classList.add('no-gl');
    canvas.remove();
    return { dispose: () => host.classList.remove('no-gl') };
  }

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
    return shader;
  };

  const program = gl.createProgram()!;
  try {
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link');
  } catch (error) {
    console.warn('[tipos] shader indisponível:', error);
    host.classList.add('no-gl');
    canvas.remove();
    return { dispose: () => host.classList.remove('no-gl') };
  }

  gl.useProgram(program);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u('u_res');
  const uTime = u('u_time');
  const uMouse = u('u_mouse');
  const uHover = u('u_hover');
  const uDpr = u('u_dpr');
  gl.uniform2f(u('u_center'), 0, 0);
  gl.uniform3fv(u('u_c1'), hexToRgb(palette.c1));
  gl.uniform3fv(u('u_c2'), hexToRgb(palette.c2));
  gl.uniform3fv(u('u_c3'), hexToRgb(palette.c3));
  gl.uniform3fv(u('u_c4'), hexToRgb(palette.c4));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  let hover = 0;
  let hoverTarget = 0;
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let visible = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = host.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  };

  const draw = (time: number) => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uHover, hover);
    gl.uniform1f(uDpr, dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const elapsed = now - last;
    if (elapsed < 31) return;
    const fps = 1000 / Math.min(elapsed, 250);
    last = now;
    const k = 60 / fps;
    const pointerEase = 1 - Math.pow(0.94, k);
    const hoverEase = 1 - Math.pow(0.96, k);
    mouse.x += (mouse.tx - mouse.x) * pointerEase;
    mouse.y += (mouse.ty - mouse.y) * pointerEase;
    hover += (hoverTarget - hover) * hoverEase;
    draw((now - start) / 1000);
  };

  const play = () => {
    if (reduced || raf || !visible) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const still = () => draw(18);

  const onMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    mouse.tx = (event.clientX - rect.left) / rect.width;
    mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    hoverTarget = 1;
    if (reduced) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
      hover = 1;
      still();
    }
  };
  const onLeave = () => {
    hoverTarget = 0;
    if (reduced) {
      hover = 0;
      still();
    }
  };

  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (reduced) still();
  });
  resizeObserver.observe(host);

  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    },
    { rootMargin: '100px' },
  );
  intersection.observe(host);

  resize();
  if (reduced) still();
  else play();

  return {
    dispose: () => {
      pause();
      resizeObserver.disconnect();
      intersection.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    },
  };
}
