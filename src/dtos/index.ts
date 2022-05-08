export interface IAdress {
  country: string;
  state: string;
  county: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

export interface IUserInfo {
  id?: number;
  name: string;
  email: string;
  role: string;
  cpf: string;
  pis: string;
  addressId: number;
  address: IAdress;
  photo?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IConfig {
  type: string;
  service: string;
  data?: IUserCredentials | IUserInfo;
  queryString?: string;
}
