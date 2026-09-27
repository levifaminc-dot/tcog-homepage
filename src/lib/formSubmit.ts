/** FormSubmit returns HTTP 200 even when it rejects a submission. */
export function formSubmitSucceeded(body: unknown): boolean {
  if (!body || typeof body !== 'object' || !('success' in body)) return false;
  return body.success === true || body.success === 'true';
}
