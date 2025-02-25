import { ConfigService } from '@nestjs/config';

export class configMock extends ConfigService {
  override setEnvFilePaths(paths: string[]): void {
    if (paths.length > 0) {
      return;
    }
  }
  override set<T = any>(propertyPath: string, value: T): void {
    if (typeof propertyPath === 'string' && value !== null) {
      return;
    }
  }
  override getOrThrow<T = any>(propertyPath: string): Exclude<T, undefined> {
    if (typeof propertyPath === 'string') {
      return;
    }
  }

  override get changes$() {
    return undefined;
  }
  override get(propertyPath: string) {
    const str = propertyPath.toUpperCase();
    const env = process.env[str];
    if (typeof env === 'undefined') {
      return 'hola gato';
    }
    return env;
  }
}
