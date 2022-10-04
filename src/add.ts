import { add } from './api.ts';
import { getWorkId, getWorks } from './ao3.ts';

const answer = prompt('Enter URLs:') || '';
const urls = answer.split(' ').filter(Boolean);
const ids = urls.map(getWorkId);
console.log('ids:', ids);
const works = await getWorks(ids);
await add(...works);
