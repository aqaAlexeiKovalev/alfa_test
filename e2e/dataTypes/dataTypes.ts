export interface ILocator {
  value: string;
  definition: string;
}

export interface IUrlDataType {
  mainUrl: string;
}
  
export interface IUserDataType {
  index: number;
  description: string;
  username: string;
  password: string;
}
  
export interface INoteDataType {
  index: number,
  name: string,
  type: string,
  price: number,
  discount: number,
  count: number
}
