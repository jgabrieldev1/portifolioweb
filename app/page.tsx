/* oxlint-disable next/no-img-element -- Static Vite entry uses local images with explicit dimensions. */
'use client';
import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { installReferenceReveals } from '../lib/reveals';
import TiposStage from './tipos-stage';
import Clock from './clock';
import Age from './age';
import ScrollVideo from './scroll-video';

const WHATSAPP =
  'https://wa.me/5565981186509?text=Oi%2C%20gostei%20do%20seu%20trabalho%20e%20gostaria%20de%20conhecer%20melhor.';
const GITHUB = 'https://github.com/jgabrieldev1';

type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
};

const featured = {
  title: 'Lusco Audiovisual',
  kind: 'Landing page · produtora audiovisual',
  summary:
    'O filme do set fica preso atrás da página: uma folha rosada com furos revela o vídeo conforme a rolagem. Intro em coluna de quadros, logo que se encolhe até o menu e rolagem suave.',
  highlights: [
    ['Vídeo atrás da página', 'a folha com furos funciona como máscara sobre o filme em tela cheia'],
    ['Intro em quadros', 'coluna de fotogramas que abre a página antes do logo'],
    ['Rolagem suave', 'Lenis controla o ritmo e as entradas de cada seção'],
  ],
  stack: ['Vite', 'JavaScript', 'CSS', 'Lenis', 'GitHub Pages'],
};

const projects: Project[] = [
  {
    id: '02',
    title: 'JelleWeb',
    kind: 'Estúdio digital',
    summary: 'Vitrine de landing pages e sites institucionais por segmento, com validação de HTML, lint e testes visuais no CI.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Playwright', 'GitHub Actions'],
    repo: `${GITHUB}/portifolioweb`,
    live: 'https://jgabrieldev1.github.io/portifolioweb/',
  },
  {
    id: '03',
    title: 'API Gestão Escolar',
    kind: 'Imersão DevOps · Alura + Google Cloud',
    summary: 'API para alunos, cursos e matrículas, com documentação interativa e ambiente containerizado do dev à produção.',
    stack: ['Python', 'FastAPI', 'Docker', 'Docker Compose'],
    repo: `${GITHUB}/api-gestao-escolar`,
  },
  {
    id: '04',
    title: 'Este portfólio',
    kind: 'v1 RPG em pixel art → v2 terminal',
    summary: 'A primeira versão era um jogo; esta escreve fumaça em caracteres 5×7 desenhados direto num shader WebGL2.',
    stack: ['React', 'TypeScript', 'WebGL2', 'GLSL', 'Vite'],
  },
];

const education = [
  { course: 'Engenharia de Software', school: 'Estácio', kind: 'Bacharelado', status: 'cursando', year: '2027' },
  { course: 'DevOps e Arquitetura Cloud', school: 'FIAP', kind: 'Pós-graduação', status: 'cursando', year: '2027' },
  { course: 'Arquitetura de Software/Tecnologia', school: 'UniÚnica', kind: 'Pós-graduação', status: 'cursando', year: '2027' },
  { course: 'Ciência de Dados e Inteligência Artificial', school: 'UniÚnica', kind: 'Pós-graduação', status: 'concluída', year: '2026' },
  { course: 'Gestão de Recursos Humanos', school: 'UNIC', kind: 'Tecnólogo', status: 'concluído', year: '2026' },
];

const stack = [
  { area: 'web', items: ['React', 'TypeScript', 'JavaScript', 'HTML + CSS', 'Vite', 'WebGL'] },
  { area: 'back-end', items: ['Python', 'FastAPI', 'Go', 'PostgreSQL'] },
  { area: 'cloud + devops', items: ['Docker', 'Terraform', 'GitHub Actions', 'ArgoCD', 'AWS EKS', 'DevSecOps'] },
  { area: 'base', items: ['Suporte de TI', 'Infraestrutura', 'Sistemas', 'Git'] },
];

const tools = [
  { name: 'Codex', image: '/brands/codex-official.svg', text: 'Implementação, refatoração e revisão da primeira versão deste portfólio.' },
  { name: 'Claude Code', image: '/brands/claude-code-official.svg', text: 'Exploração do código, implementação e revisão deste redesign.' },
  { name: 'Cursor', image: '/brands/cursor.svg', text: 'Desenvolvimento assistido por IA dentro do editor.' },
];

const marquee = ['React', 'TypeScript', 'Go', 'Python', 'FastAPI', 'Docker', 'Terraform', 'GitHub Actions', 'ArgoCD', 'Amazon EKS', 'WebGL2', 'Vite'];

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function ProjectLinks({ repo, live }: { repo?: string; live?: string }) {
  if (!repo && !live) return <span className="project-link is-here">você está aqui</span>;
  return (
    <div className="project-links">
      {live && (
        <a className="project-link" href={live} target="_blank" rel="noopener noreferrer">
          ver no ar <ArrowUpRight size={15} />
        </a>
      )}
      {repo && (
        <a className="project-link" href={repo} target="_blank" rel="noopener noreferrer">
          código <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

export default function Home() {
  useEffect(() => installReferenceReveals(), []);

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="João Gabriel, início">
          <span className="brand-mark" aria-hidden="true">jg<b>▌</b></span>
          <span className="brand-name">João Gabriel</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#projetos"><small>01</small>Projetos</a>
          <a href="#sobre"><small>02</small>Sobre</a>
          <a href="#stack"><small>03</small>Stack</a>
          <a className="nav-contact" href="#contato">Conversar <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="conteudo">
        <TiposStage id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <p className="prompt" data-hero>
              <span className="prompt-user">jg@cuiabá</span>:<span className="prompt-path">~/portfólio</span>$ whoami<b className="caret" aria-hidden="true" />
            </p>
            <h1 id="hero-title" data-hero>
              Código,
              <br />
              curiosidade
              <br />
              <em>e pixel art.</em>
            </h1>
            <p className="hero-copy" data-hero>
              Sou <strong>João Gabriel</strong>, estudante de Engenharia de Software. Venho do suporte e da
              infraestrutura de TI — hoje construo para a web, automatizo processos e estudo cloud e DevOps.
            </p>
            <div className="hero-actions" data-hero>
              <a className="button primary" href="#projetos">
                Ver projetos <ArrowDown size={18} />
              </a>
              <a className="button ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Conversar <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <dl className="wrap hero-status" data-hero>
            <div><dt>local</dt><dd>Cuiabá-MT · <Clock /></dd></div>
            <div><dt>foco</dt><dd>web · automação · cloud</dd></div>
            <div><dt>status</dt><dd><i className="pulse" aria-hidden="true" />aberto a oportunidades</dd></div>
          </dl>
        </TiposStage>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...marquee, ...marquee].map((item, index) => (
              <span key={index}>{item}<b>/</b></span>
            ))}
          </div>
        </div>

        <section id="projetos" className="section" aria-labelledby="projects-title">
          <div className="wrap">
            <div className="section-heading" data-reveal="rise">
              <p className="label"><b>01</b> projetos</p>
              <h2 id="projects-title">Ideias que<br />viram <em>código.</em></h2>
              <p className="section-intro">Landing pages com movimento, sites, APIs e experimentos visuais — do layout ao deploy.</p>
            </div>

            <article className="featured" data-reveal="rise">
              <div className="featured-head">
                <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="featured-path">~/projetos/01-lusco</span>
                <span className="featured-tag">destaque</span>
              </div>
              <div className="featured-body">
                <ScrollVideo
                  src="/projects/lusco-scroll.webm"
                  poster="/projects/lusco-poster.jpg"
                  label="Gravação da landing page Lusco Audiovisual rolando do topo ao rodapé: logo rosa com flor de hibisco sobre cena de filmagem, filmes recentes, etapas de produção e contato."
                />
                <div className="featured-info">
                  <p className="project-kind">{featured.kind}</p>
                  <h3>{featured.title}</h3>
                  <p className="project-summary">{featured.summary}</p>
                  <ul className="highlights">
                    {featured.highlights.map(([title, text]) => (
                      <li key={title}><strong>{title}</strong><span>{text}</span></li>
                    ))}
                  </ul>
                  <ul className="chips" aria-label="Tecnologias">
                    {featured.stack.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </article>

            <div className="project-grid">
              {projects.map(project => (
                <article className="project" key={project.id} data-reveal="rise">
                  <div className="project-top">
                    <span className="project-id">{project.id}</span>
                    <p className="project-kind">{project.kind}</p>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="chips" aria-label="Tecnologias">
                    {project.stack.map(item => <li key={item}>{item}</li>)}
                  </ul>
                  <ProjectLinks repo={project.repo} live={project.live} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="section about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <div className="about-intro" data-reveal="rise">
              <p className="label"><b>02</b> sobre</p>
              <h2 id="about-title">Prazer,<br /><em>João Gabriel.</em></h2>
              <figure className="v1">
                <img src="/project-hero-garden.webp" width="1448" height="1086" loading="lazy" alt="Aventureiro com espada em um jardim de flores, ilustração em pixel art da primeira versão do portfólio." />
                <figcaption>v1 · o portfólio em pixel art que deu origem a este</figcaption>
              </figure>
            </div>
            <div>
              <div className="about-copy" data-reveal="rise">
                <p className="lead">
                  Tenho <Age /> anos, sou de Cuiabá e estudo Engenharia de Software. Minha experiência em TI passa por
                  sistemas, suporte e infraestrutura.
                </p>
                <p>
                  Essa vivência me aproxima dos problemas de quem usa a tecnologia no dia a dia. No desenvolvimento,
                  começo pela necessidade e escolho a ferramenta depois — seja uma interface, uma automação ou um pipeline
                  de entrega na nuvem.
                </p>
              </div>
              <div className="education" data-reveal="rise">
                <h3 className="label">formação</h3>
                <ul>
                  {education.map(item => (
                    <li key={item.course}>
                      <span className={`edu-status ${item.status === 'cursando' ? 'is-open' : ''}`}>[{item.status}]</span>
                      <div>
                        <strong>{item.course}</strong>
                        <span>{item.school} · {item.kind}</span>
                      </div>
                      <time>{item.year}</time>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="section" aria-labelledby="stack-title">
          <div className="wrap">
            <div className="section-heading" data-reveal="rise">
              <p className="label"><b>03</b> stack e processo</p>
              <h2 id="stack-title">IA com revisão<br />e <em>contexto.</em></h2>
              <p className="section-intro">Uso IA para acelerar desenvolvimento, debugging e revisão de código — e reviso, testo e adapto cada resposta ao projeto.</p>
            </div>

            <div className="stack-grid" data-reveal="rise">
              {stack.map(group => (
                <div className="stack-group" key={group.area}>
                  <p className="stack-area">{group.area}</p>
                  <ul>
                    {group.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="tools" data-reveal="rise">
              {tools.map(tool => (
                <article key={tool.name}>
                  <h3>
                    <img className={tool.name === 'Codex' ? 'codex-mark' : ''} src={tool.image} width="24" height="24" alt="" loading="lazy" />
                    {tool.name}
                  </h3>
                  <p>{tool.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section contact" aria-labelledby="contact-title">
          <div className="wrap contact-content" data-reveal="rise">
            <p className="label"><b>04</b> contato</p>
            <h2 id="contact-title">Vamos conversar<br />sobre o seu <em>projeto?</em></h2>
            <p>Conte o que você quer construir ou compartilhe uma oportunidade.</p>
            <a className="button primary large" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> Conversar no WhatsApp <ArrowUpRight size={18} />
            </a>
            <div className="socials">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer"><GithubMark /> GitHub</a>
              <a href="https://linkedin.com/in/jgabrieldev1" target="_blank" rel="noopener noreferrer"><LinkedinMark /> LinkedIn</a>
              <a href="mailto:joao.salesti@gmail.com"><Mail size={18} /> E-mail</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-content">
          <a className="brand-mark" href="#inicio" aria-label="Voltar ao início">jg<b>▌</b></a>
          <span>© {new Date().getFullYear()} João Gabriel · feito em Cuiabá</span>
          <span className="footer-build">v2 · react + webgl2</span>
        </div>
      </footer>
    </>
  );
}
