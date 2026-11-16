/** João Gabriel's age on the civil date in Cuiabá (birthday: 1 December 2002). */
export function calculateAge(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Cuiaba', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(now);
  const read = (type: string) => Number(parts.find(part => part.type === type)?.value);
  const year = read('year');
  const birthdayReached = read('month') === 12 && read('day') >= 1;
  return year - 2002 - (birthdayReached ? 0 : 1);
}
