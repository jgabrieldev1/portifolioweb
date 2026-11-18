'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Props = { src: string; poster: string; label: string };

/** Gravação da página rolando: toca só quando está na tela e respeita movimento reduzido. */
export default function ScrollVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPaused(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.dataset.userPaused) video.play().catch(() => setPaused(true));
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      delete video.dataset.userPaused;
      video.play().catch(() => undefined);
    } else {
      video.dataset.userPaused = 'true';
      video.pause();
    }
  };

  return (
    <figure className="scroll-video">
      <div className="scroll-video-screen">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        />
        <button type="button" className="scroll-video-toggle" onClick={toggle} aria-label={paused ? 'Reproduzir gravação' : 'Pausar gravação'}>
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
      <figcaption>página real, gravada rolando do topo ao rodapé</figcaption>
    </figure>
  );
}
