import { Worker } from 'node:worker_threads';

export class cipher {
  static encrypted(text: string): string {
    const worker = new Worker('./worker/encript-worker.ts', {
      workerData: text,
    });
    let response: string;
    worker.on('message', (result) => {
      response = result;
    });
    worker.on('error', () => {
      throw new Error();
    });
    worker.on('exit', () => {
      throw new Error();
    });
    return response;
  }
  static decrypted(texthash: string): string {
    const worker = new Worker('./worker/decript-worker.ts', {
      workerData: texthash,
    });
    let response: string;
    worker.on('message', (result) => {
      response = result;
    });
    worker.on('error', () => {
      throw new Error();
    });
    worker.on('exit', () => {
      throw new Error();
    });
    return response;
  }
}
