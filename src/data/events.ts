import type { ChurchEvent } from '../lib/sanity';

export type SiteEvent = ChurchEvent & { source: 'sanity' | 'fallback' };

export const fallbackEvents: SiteEvent[] = [
  {
    _id: 'fallback-monday-prayer-meeting', slug: 'monday-prayer-meeting', title: 'Monday Prayer Meeting',
    category: 'Prayer & fellowship', scheduleType: 'recurring', recurrenceLabel: 'Every Monday at 5:00 pm',
    summary: 'Join the church family each Monday evening for a dedicated time of prayer, encouragement, and seeking God together.',
    venue: 'National Office, Omuo Ekiti', address: 'Opposite Ammunu Comprehensive High School, Omuo Ekiti, Ekiti State, Nigeria.',
    mapUrl: 'https://maps.app.goo.gl/F3KpTRaDfWW6TmfL9', source: 'fallback',
  },
  {
    _id: 'fallback-wednesday-bible-study', slug: 'wednesday-bible-study', title: 'Wednesday Bible Study',
    category: 'Bible teaching', scheduleType: 'recurring', recurrenceLabel: 'Every Wednesday at 5:00 pm',
    summary: 'Gather with us each Wednesday evening to study God’s Word, ask questions, and grow together in faithful Christian living.',
    venue: 'National Office, Omuo Ekiti', address: 'Opposite Ammunu Comprehensive High School, Omuo Ekiti, Ekiti State, Nigeria.',
    mapUrl: 'https://maps.app.goo.gl/F3KpTRaDfWW6TmfL9', source: 'fallback',
  },
  {
    _id: 'fallback-national-convention', slug: 'national-convention', title: 'The Church of God Nigeria National Convention',
    category: 'National gathering', scheduleType: 'tba',
    summary: 'The national convention will bring the Church together for worship, fellowship, ministry, and the Word. The confirmed date, venue, and programme will be published here when available.',
    venue: 'Venue to be announced', source: 'fallback',
  },
  {
    _id: 'fallback-womens-seminar', slug: 'womens-seminar', title: 'Women Missionary Fellowship Seminar',
    category: 'Women in ministry', scheduleType: 'dated', startDate: '2026-10-03T12:00:00+01:00', allDay: true,
    summary: 'A dedicated seminar for women to grow in the Word, strengthen fellowship, and be equipped for faithful Christian service and mission.',
    venue: 'National Office, Omuo Ekiti', address: 'Opposite Ammunu Comprehensive High School, Omuo Ekiti, Ekiti State, Nigeria.',
    mapUrl: 'https://maps.app.goo.gl/F3KpTRaDfWW6TmfL9', source: 'fallback',
  },
];

export function mergeEvents(cmsEvents: ChurchEvent[]): SiteEvent[] {
  const cmsSlugs = new Set(cmsEvents.map((event) => event.slug));
  return [
    ...cmsEvents.map((event) => ({ ...event, source: 'sanity' as const })),
    ...fallbackEvents.filter((event) => !cmsSlugs.has(event.slug)),
  ];
}

export function isPastEvent(event: SiteEvent, now = new Date()) {
  if (event.scheduleType !== 'dated' || !event.startDate) return false;
  return new Date(event.endDate ?? event.startDate).getTime() < now.getTime();
}

export function eventDateLabel(event: SiteEvent) {
  if (event.scheduleType === 'recurring') return event.recurrenceLabel ?? 'Recurring gathering';
  if (event.scheduleType === 'tba' || !event.startDate) return 'Date to be announced';
  const start = new Date(event.startDate);
  const date = new Intl.DateTimeFormat('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' }).format(start);
  if (event.allDay) return date;
  const time = new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(start);
  return `${date} at ${time}`;
}

export function eventDateBadge(event: SiteEvent) {
  if (event.scheduleType === 'recurring') {
    const weekday = event.recurrenceLabel?.match(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/i)?.[0];
    return { primary: weekday?.slice(0, 3).toUpperCase() ?? 'REP', secondary: 'Weekly' };
  }
  if (event.scheduleType === 'tba' || !event.startDate) return { primary: 'TBA', secondary: 'Soon' };
  const date = new Date(event.startDate);
  return {
    primary: new Intl.DateTimeFormat('en-NG', { day: '2-digit', timeZone: 'Africa/Lagos' }).format(date),
    secondary: new Intl.DateTimeFormat('en-NG', { month: 'short', timeZone: 'Africa/Lagos' }).format(date).toUpperCase(),
  };
}

export function sortUpcomingEvents(events: SiteEvent[]) {
  const rank = (event: SiteEvent) => event.scheduleType === 'recurring' ? 0 : event.scheduleType === 'dated' ? 1 : 2;
  return [...events].sort((a, b) => {
    const rankDifference = rank(a) - rank(b);
    if (rankDifference) return rankDifference;
    if (a.startDate && b.startDate) return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    return a.title.localeCompare(b.title);
  });
}
