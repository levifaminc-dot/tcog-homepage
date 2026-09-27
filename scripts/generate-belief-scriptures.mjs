/** Regenerate the small, offline KJV extract used by the Basic Bible Beliefs page. */
import { readFile, writeFile } from 'node:fs/promises';

const source = 'https://raw.githubusercontent.com/midvash/bible-data/d9fe1779447717bbfcb578e505b893125cad581c/versions/en/kjv/kjv.json';
const page = await readFile(new URL('../src/pages/basic-bible-beliefs.astro', import.meta.url), 'utf8');
const references = [...new Set([...page.matchAll(/refs: '([^']+)'/g)].flatMap(([, list]) => list.split(' · ')))];
const response = await fetch(source);
if (!response.ok) throw new Error(`KJV source returned ${response.status}`);
const bible = await response.json();
if (bible.version !== 'kjv' || bible.books?.length !== 66) throw new Error('Unexpected KJV source format');

const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/^psalm$/, 'psalms');
const books = new Map(bible.books.map((book) => [normalize(book.englishName), book]));
const passages = {};

for (const reference of references) {
  const match = /^(.+?) (\d+):([\d\s,–-]+)$/.exec(reference);
  if (!match) throw new Error(`Cannot parse reference: ${reference}`);
  const [, name, chapterNumber, selector] = match;
  const book = books.get(normalize(name));
  const chapter = book?.chapters.find(({ chapter }) => chapter === Number(chapterNumber));
  if (!chapter) throw new Error(`Cannot find KJV chapter: ${reference}`);

  const numbers = new Set();
  for (const part of selector.split(',')) {
    const [first, last = first] = part.trim().split(/[–-]/).map(Number);
    if (!Number.isInteger(first) || !Number.isInteger(last) || last < first) throw new Error(`Invalid verse range: ${reference}`);
    for (let number = first; number <= last; number++) numbers.add(number);
  }
  passages[reference] = [...numbers].sort((a, b) => a - b).map((number) => {
    const verse = chapter.verses.find((item) => item.number === number);
    if (!verse) throw new Error(`Missing verse ${number}: ${reference}`);
    return { number: `${chapterNumber}:${number}`, text: verse.text };
  });
}

const output = { translation: 'King James Version', source, passages };
await writeFile(new URL('../src/data/beliefScriptures.json', import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Saved ${references.length} KJV references (${Object.values(passages).reduce((sum, verses) => sum + verses.length, 0)} verses).`);
