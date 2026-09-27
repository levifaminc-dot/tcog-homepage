import assert from 'node:assert/strict';
import test from 'node:test';
import { formSubmitSucceeded } from '../src/lib/formSubmit.ts';

test('only acknowledges submissions explicitly accepted by FormSubmit', () => {
  assert.equal(formSubmitSucceeded({ success: true }), true);
  assert.equal(formSubmitSucceeded({ success: 'true' }), true);
  assert.equal(formSubmitSucceeded({ success: false }), false);
  assert.equal(formSubmitSucceeded({ success: 'false', message: 'Activation required' }), false);
  assert.equal(formSubmitSucceeded({}), false);
  assert.equal(formSubmitSucceeded(null), false);
});
