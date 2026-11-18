'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { mountTipos, PHOSPHOR_GREEN, type TiposPalette } from '../lib/tipos-shader';

type Props = {
  children: ReactNode;
  className?: string;
  palette?: TiposPalette;
  id?: string;
  'aria-labelledby'?: string;
};

/** Palco do fundo ASCII: o canvas entra como primeiro filho e o conteúdo fica por cima. */
export default function TiposStage({ children, className = '', palette = PHOSPHOR_GREEN, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const handle = mountTipos(ref.current, palette);
    return () => handle.dispose();
  }, [palette]);

  return (
    <section ref={ref} className={`tipos-stage ${className}`} {...rest}>
      {children}
    </section>
  );
}
