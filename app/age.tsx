'use client';

import { useSyncExternalStore } from 'react';
import { calculateAge } from '@/lib/age';

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 30_000);
  window.addEventListener('focus', onChange);
  return () => { window.clearInterval(timer); window.removeEventListener('focus', onChange); };
}

// Server placeholder avoids serving a stale build-time age or hydration mismatch.
export default function Age() {
  const age = useSyncExternalStore(subscribe, calculateAge, () => null);
  return <>{age ?? '…'}</>;
}
