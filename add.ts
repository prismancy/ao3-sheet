import API from './api';
import { getWorkId, getWorks } from './ao3';
import { input } from './utils';

(async () => {
  const api = await API.create();
  const answer = await input('Enter URLs: ');
  const urls = answer.split(' ').filter(Boolean);
  const ids = urls.map(getWorkId);
  console.log('ids:', ids);
  const works = await getWorks(ids);
  return api.add(...works);
})();
