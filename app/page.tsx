/* oxlint-disable next/no-img-element -- Static Vite entry uses local images with explicit dimensions. */
'use client';
import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Code2 as Github, BriefcaseBusiness as Linkedin, Mail, MessageCircle, Compass } from 'lucide-react';
import { installReferenceReveals } from '../lib/reveals';
const education = [
 ['Engenharia de Software','Estácio','Em andamento, previsão 2027'],
 ['Gestão de Recursos Humanos','UNIC','Concluído em 2026'],
 ['Ciência de Dados e Inteligência Artificial','UniÚnica','Concluída em 2026'],
 ['DevOps e Arquitetura Cloud','FIAP','Em andamento, previsão 2027'],
 ['Arquitetura de Software/Tecnologia','UniÚnica','Em andamento, previsão 2027'],
];
const tools = [
 {name:'Codex',image:'/brands/codex-official.svg',text:'Apoio à implementação, refatoração e revisão deste portfólio.'},
 {name:'Claude Code',image:'/brands/claude-code-official.svg',text:'Ferramenta com a qual tenho familiaridade para explorar código e soluções.'},
 {name:'Cursor',image:'/brands/cursor.svg',text:'Desenvolvimento assistido por IA no editor.'},
];
export default function Home() {
 useEffect(() => installReferenceReveals(), []);
 return <>
 <a className="skip" href="#conteudo">Pular para o conteúdo</a>
 <header className="site-header dark"><a className="brand" href="#inicio" aria-label="João Gabriel, início"><b>JG<span>▸</span></b><span>JOÃO GABRIEL<small>DESENVOLVIMENTO & EXPLORAÇÃO</small></span></a><nav aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a><a href="#processo">Processo</a><a className="nav-contact" href="#contato">Conversar <ArrowUpRight size={16}/></a></nav></header>
 <main id="conteudo">
 <section id="inicio" className="hero dark" aria-labelledby="hero-title"><img className="landscape" src="/adventure.webp" width="1672" height="941" fetchPriority="high" alt="Trilha entre montanhas e floresta sob a lua, com uma oficina iluminada à direita, em pixel art."/><div className="shade"/><div className="wrap hero-content"><p className="label">PORTFÓLIO DE JOÃO GABRIEL</p><h1 id="hero-title" data-hero>Código,<br/>curiosidade<br/><em>e pixel art.</em></h1><p className="hero-copy" data-hero>Sou João Gabriel. Estudo Engenharia de Software e exploro desenvolvimento web, automação e cloud.</p><div data-hero><a className="button primary" href="#projetos"><Compass size={19}/>Explorar projetos<ArrowDown size={18}/></a></div></div></section>
 <section id="projetos" className="section dark" aria-labelledby="projects-title"><div className="wrap"><div className="section-heading"><p className="label">PROJETO EM DESTAQUE</p><h2 id="projects-title">Um portfólio<br/>com identidade de jogo.</h2></div><article className="project card"><figure className="project-visual" data-reveal="slide"><img src="/project-hero-garden.webp" width="1448" height="1086" loading="lazy" alt="Aventureiro com espada em um jardim de flores e colinas, ilustrado em pixels."/><figcaption className="label project-label">PROJETO PESSOAL</figcaption></figure><div className="project-info" data-reveal="media"><h3>Meu portfólio</h3><p>Projeto pessoal em React e TypeScript, inspirado no meu interesse por jogos.</p><p><strong>O desafio:</strong> combinar pixel art e navegação clara, com uma interface que também funcione no celular.</p><p><strong>As escolhas:</strong> ilustração para criar atmosfera, texto separado para explicar o trabalho e contraste para facilitar a leitura.</p><p className="project-credit">Codex apoiou a implementação; ImageGen foi usado nas ilustrações. A base técnica inclui React, TypeScript e CSS.</p></div></article></div></section>
 <section id="sobre" className="section about light" aria-labelledby="about-title"><div className="wrap about-grid"><div data-reveal="rise"><p className="label">SOBRE</p><h2 id="about-title">Prazer,<br/>João Gabriel.</h2></div><div><div className="about-copy" data-reveal="rise"><p>Sou de Cuiabá e estudo Engenharia de Software. Minha experiência em tecnologia da informação passa por sistemas, suporte e infraestrutura.</p><p>Essa vivência me aproxima dos problemas de quem usa a tecnologia. No desenvolvimento, começo pela necessidade e uso ferramentas para explorar soluções.</p></div><div className="education"><h3>Formação</h3><ul>{education.map(([course,school,status])=><li key={course}><strong>{course}</strong><span>{school}</span><small>{status}</small></li>)}</ul></div></div></div></section>
 <section id="processo" className="section dark" aria-labelledby="process-title"><div className="wrap"><div className="section-heading"><p className="label">PROCESSO</p><h2 id="process-title">IA com revisão<br/>e contexto.</h2></div><div className="process-panel card"><p className="process-intro">Uso IA para apoiar desenvolvimento, debugging e revisão de código. Avalio e adapto as respostas ao contexto do projeto.</p><div className="tools">{tools.map(tool=><article key={tool.name}><h3><img className={tool.name==='Codex'?'codex-mark':''} src={tool.image} width="26" height="26" alt="" loading="lazy"/>{tool.name}</h3><p>{tool.text}</p></article>)}</div><p className="stack-note">Neste portfólio, a base é <strong>React, TypeScript e CSS.</strong></p></div></div></section>
 <section id="contato" className="section contact dark" aria-labelledby="contact-title"><div className="wrap contact-content"><p className="label">CONTATO</p><h2 id="contact-title">Vamos conversar<br/>sobre seu projeto?</h2><p>Conte o que você quer construir ou compartilhe uma oportunidade.</p><a className="button primary" href="https://wa.me/5565981186509?text=Oi%2C%20gostei%20do%20seu%20trabalho%20e%20gostaria%20de%20conhecer%20melhor." target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/>Conversar no WhatsApp<ArrowUpRight size={18}/></a><div className="socials"><a href="https://github.com/jgabrieldev1" target="_blank" rel="noopener noreferrer"><Github size={18}/>GitHub<ArrowUpRight size={14}/></a><a href="https://linkedin.com/in/jgabrieldev1" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/>LinkedIn<ArrowUpRight size={14}/></a><a href="mailto:joao.salesti@gmail.com"><Mail size={18}/>E-mail<ArrowUpRight size={14}/></a></div></div></section>
 </main><footer className="dark"><div className="wrap footer-content"><a className="footer-logo" href="#inicio" aria-label="Voltar ao início">JG▸</a><span>© {new Date().getFullYear()} João Gabriel</span></div></footer>
 </>;
}


