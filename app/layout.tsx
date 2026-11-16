import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'João Gabriel | Desenvolvimento, automação e cloud',
 description: 'Projetos, escolhas de desenvolvimento e interesses de João Gabriel, com identidade visual inspirada em jogos e pixel art.',
 icons: { icon: '/favicon.svg' },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
