import { createInterface } from 'node:readline';

export const input = (question: string) =>
  new Promise<string>(resolve => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
