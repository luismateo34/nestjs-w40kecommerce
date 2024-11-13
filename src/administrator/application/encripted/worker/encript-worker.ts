import { parentPort, workerData } from 'worker_threads';
import { cipherclass } from './cipherclass';

const result = cipherclass.encrypted(workerData);
parentPort.postMessage(result);
