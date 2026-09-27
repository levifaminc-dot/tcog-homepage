const controlCharacters = /[\u0000-\u001f\u007f]/;

/** Treat published CMS URLs as untrusted, even when the Studio validates them. */
export function safeContentHref(value: unknown, allowRelative = false): string | null {
  if (typeof value !== 'string') return null;
  const href = value.trim();
  if (!href || controlCharacters.test(href) || /%0[ad]/i.test(href) || href.includes('\\')) return null;

  if (allowRelative && ((href.startsWith('/') && !href.startsWith('//')) || href.startsWith('#'))) {
    return href;
  }

  try {
    const url = new URL(href);
    if ((url.protocol === 'https:' || url.protocol === 'http:') && url.hostname && !url.username && !url.password) {
      return url.href;
    }
    if (url.protocol === 'mailto:' && url.pathname && !/\s/.test(url.pathname)) return href;
    if (url.protocol === 'tel:' && /^\+?[0-9().\- ]+$/.test(url.pathname)) return href;
  } catch {
    // Relative, malformed, or scriptable URLs are not rendered as links.
  }
  return null;
}

export function safeHttpHref(value: unknown): string | null {
  const href = safeContentHref(value);
  return href && /^https?:\/\//.test(href) ? href : null;
}
