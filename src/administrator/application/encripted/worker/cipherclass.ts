import {
  createCipheriv,
  createHash,
  randomBytes,
  createDecipheriv,
} from 'node:crypto';

class criptografy {
  private algorithm: string = process.env.ALGORITHM ?? '';
  private hashKey() {
    return createHash('sha256').update(process.env.SECRET_KEY).digest('hex');
  }
  encrypted(text: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.hashKey(), iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }
  decrypted(texthash: string): string {
    const [iv, encrypted] = texthash
      .split(':')
      .map((el) => Buffer.from(el, 'hex'));
    const decipher = createDecipheriv(this.algorithm, this.hashKey(), iv);
    const decript = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decript.toString('utf8');
  }
}
export const cipherclass = new criptografy();
