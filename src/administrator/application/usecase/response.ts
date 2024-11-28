export enum responsefind {
  NOT_FOUND = 'USUARIO NO ENCONTRADO',
  ERROR_SERVER = 'DATOS NO VALIDOS',
  SUCCESS = 'USUARIO ENCONTRADO',
  UNAUTORIZED = 'CREDENCIALES INVALIDAS',
}

export enum register {
  ERRORDATA = 'ERROR AL REGISTRAR, FALTA ALGUN DATO',
  EXIST = 'USUARIO YA EXISTE',
}

export enum ErrorServer {
  ERROR_SERVER = 'internal server error',
  SERVER_SUCCES = 'respuesta satisfactoria',
}

export enum Update {
  ERROR = 'ERROR AL ACTUALIZAR',
  SUCCESS = 'ACTUALIZACION EXITOSA',
}
