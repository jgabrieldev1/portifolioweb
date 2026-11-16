/** Visible by default; animations belong only to this installation. */
export function installReferenceReveals(root: Document = document) {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const animations = new Map<HTMLElement, Animation>();
 let active = true;
 const elements = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
 const heroes = [...root.querySelectorAll<HTMLElement>('[data-hero]')];
 const finish = (element: HTMLElement) => {
  element.dataset.revealPlayed = 'true';
  const animation = animations.get(element);
  if (animation) { animation.onfinish = null; animation.cancel(); }
  animations.delete(element);
 };
 const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
  if (!active) return;
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   const element = entry.target as HTMLElement;
   observer?.unobserve(element);
   element.dataset.revealPlayed = 'true';
   if (reduced.matches || document.visibilityState === 'hidden' || entry.boundingClientRect.bottom <= 0) finish(element);
   else animations.get(element)?.play();
  }
 }, { threshold: 0, rootMargin: '0px 0px 96px 0px' }) : undefined;
 const stop = () => { observer?.disconnect(); [...elements,...heroes].forEach(finish); };
 const onPreference = () => { if (reduced.matches) stop(); };
 reduced.addEventListener('change', onPreference);
 for (const element of elements) {
  if (element.dataset.revealPlayed === 'true') continue;
  const rect = element.getBoundingClientRect();
  if (reduced.matches || !observer || !element.animate || rect.top < innerHeight || document.visibilityState === 'hidden') { finish(element); continue; }
  const transform = element.dataset.reveal === 'slide' ? 'translateX(-20px)' : element.dataset.reveal === 'media' ? 'none' : 'translateY(12px)';
  const animation = element.animate([{opacity:0,transform},{opacity:1,transform:'none'}], {duration:element.dataset.reveal === 'rise'?520:600,easing:'cubic-bezier(0.22,1,0.36,1)',fill:'backwards'});
  animation.pause();
  animation.onfinish = () => finish(element);
  animations.set(element,animation);
  observer.observe(element);
 }
 // A transform-only hero entrance never hides content after first paint.
 heroes.forEach((element,index) => {
  if (element.dataset.revealPlayed === 'true') return;
  element.dataset.revealPlayed = 'true';
  if (reduced.matches || scrollY > 0 || !element.animate || document.visibilityState === 'hidden') return;
  const animation = element.animate([{transform:'translateY(16px)'},{transform:'none'}], {duration:650,delay:index*80,easing:'cubic-bezier(0.22,1,0.36,1)',fill:'backwards'});
  animations.set(element,animation);
  animation.onfinish = () => finish(element);
 });
 return () => { active=false;stop();reduced.removeEventListener('change',onPreference); };
}
