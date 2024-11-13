import { parentPort, workerData } from 'worker_threads';
import { cipherclass } from './cipherclass';

const result = cipherclass.decrypted(workerData);
parentPort.postMessage(result);
