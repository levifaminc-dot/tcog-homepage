import assert from 'node:assert/strict';
import test from 'node:test';
import { safeContentHref, safeHttpHref } from '../src/lib/safeContentHref.ts';

test('keeps expected content links', () => {
  assert.equal(safeContentHref('https://www.thechurchofgod.org/about/'), 'https://www.thechurchofgod.org/about/');
  assert.equal(safeContentHref('mailto:Info@tcog.org.ng'), 'mailto:Info@tcog.org.ng');
  assert.equal(safeContentHref('tel:+2348063035886'), 'tel:+2348063035886');
  assert.equal(safeContentHref('/events/', true), '/events/');
  assert.equal(safeContentHref('#upcoming-events', true), '#upcoming-events');
});

test('rejects scriptable, protocol-relative, and malformed links', () => {
  for (const candidate of [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    '//example.com',
    '/\\example.com',
    'https://trusted.example@evil.example/',
    'https://example.com\njavascript:alert(1)',
    'mailto:info@example.com?subject=hello%0D%0ABcc:evil@example.com',
  ]) {
    assert.equal(safeContentHref(candidate, true), null, candidate);
  }
  assert.equal(safeContentHref('not-a-url'), null);
  assert.equal(safeContentHref('/events/'), null);
  assert.equal(safeHttpHref('mailto:Info@tcog.org.ng'), null);
  assert.equal(safeHttpHref('https://maps.app.goo.gl/F3KpTRaDfWW6TmfL9'), 'https://maps.app.goo.gl/F3KpTRaDfWW6TmfL9');
});
