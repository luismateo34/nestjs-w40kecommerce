export interface ForDeleteAdmin {
  delete_Admin(lastname: string, name: string): Promise<'success'>;
}
