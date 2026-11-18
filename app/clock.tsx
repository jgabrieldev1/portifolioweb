'use client';

import { useSyncExternalStore } from 'react';

const format = () =>
  new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Cuiaba', hour: '2-digit', minute: '2-digit' }).format(new Date());

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

/** Hora local de Cuiabá; placeholder no servidor para não hidratar um horário velho. */
export default function Clock() {
  const time = useSyncExternalStore(subscribe, format, () => '--:--');
  return <time>{time}</time>;
}
