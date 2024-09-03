export enum AppVersionEnum { 
  V1 = 1, 
  V2 = 2,
  V3 = 3,
  V4 = 4,
  V5 = 5,
  V6 = 6
}
export interface IAppVersionInfo {
  uuid: string; // in real use-case this should be a decorator! like @isvaliduuid.
  version: AppVersionEnum;
  releaseDate: string | Date;
  releaseNote: string;
}