export class mockcheq {
  async checkAdmin_Name_lastname(
    req: Request,
    name: string,
    lastname: string,
  ): Promise<void> {
    if (
      req !== null &&
      typeof name === 'string' &&
      typeof lastname === 'string'
    ) {
      return;
    }
  }
}
export class updateMock {
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    if (
      typeof name === 'string' &&
      typeof lastname === 'string' &&
      typeof email === 'string'
    ) {
      return;
    }
  }
  async Update_Client_Name(name: string, lastname: string): Promise<void> {
    if (typeof name === 'string' && typeof lastname === 'string') {
      return;
    }
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    if (
      typeof name === 'string' &&
      typeof lastname === 'string' &&
      typeof password === 'string'
    ) {
      return;
    }
  }
}
