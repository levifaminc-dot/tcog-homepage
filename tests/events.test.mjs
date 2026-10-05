import assert from 'node:assert/strict';
import test from 'node:test';
import { eventEndTime, fallbackEvents, isPastEvent } from '../src/data/events.ts';

const seminar = fallbackEvents.find((event) => event.slug === 'womens-seminar');

test('an all-day event remains upcoming through its Nigeria calendar day', () => {
  assert.ok(seminar);
  assert.equal(eventEndTime(seminar), Date.parse('2026-10-04T00:00:00+01:00'));
  assert.equal(isPastEvent(seminar, new Date('2026-10-03T23:59:59+01:00')), false);
  assert.equal(isPastEvent(seminar, new Date('2026-10-04T00:00:00+01:00')), true);
});

test('a recurring gathering never becomes a past event', () => {
  const prayer = fallbackEvents.find((event) => event.slug === 'monday-prayer-meeting');
  assert.ok(prayer);
  assert.equal(eventEndTime(prayer), null);
  assert.equal(isPastEvent(prayer, new Date('2030-01-01T00:00:00+01:00')), false);
});

test('a timed event with an end date remains upcoming until that time', () => {
  const event = { ...seminar, allDay: false, endDate: '2026-10-03T18:00:00+01:00' };
  assert.equal(isPastEvent(event, new Date('2026-10-03T17:59:59+01:00')), false);
  assert.equal(isPastEvent(event, new Date('2026-10-03T18:00:00+01:00')), true);
});
