import axios from 'axios';
import { magenta } from 'chalk';

const AO3Query = 'https://archiveofourown.org/works/';
const ao3Regex = /https:\/\/archiveofourown\.org\/works\/(\d+)/;
const titleRegex = /<title>(?<title>[\S\s]*)<\/title>/;
const wordsRegex = /<dd class="words">(?<words>[\S\s]*)<\/dd>/;

export function getWorkId(url: string): string {
  if (!url.match(ao3Regex)) throw new Error('Invalid AO3 URL');
  return url.replace(AO3Query, '').split(/\/|\?|#/)[0];
}

export interface Work {
  id: string;
  title: string;
  words: number;
}
export async function getWork(id: string): Promise<Work> {
  const url = `${AO3Query}${id}`;
  const response = await axios.get(url);
  const html = await response.data;

  const { title } = html.match(titleRegex).groups;
  const { words } = html.match(wordsRegex).groups;
  return {
    id,
    title: title.trim().split(' - ')[0],
    words: parseInt(words.replaceAll(',', ''))
  };
}
export async function getWorks(ids: string[]): Promise<Work[]> {
  const works: Work[] = [];
  for (let i = 0, { length } = ids; i < length; i++) {
    const id = ids[i];
    try {
      const work = await getWork(id);
      works.push(work);
      console.log(
        `✅ Got work #${magenta(i + 1)}/${magenta(length)}: ${work.title}`
      );
    } catch {
      console.error(
        `❌ Failed to get work #${magenta(i + 1)}/${magenta(length)}: ${id}`
      );
    }
  }
  return works;
}
