export interface ForDeleteAdmin {
  deleteAdmin(lastname: string, name: string): Promise<Error | 'success'>;
}
