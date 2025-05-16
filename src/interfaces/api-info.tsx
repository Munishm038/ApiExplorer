export interface IApiList {
  [apiName: string]: IApiEntry;
}

export interface IApiEntry {
  added: string;
  preferred: string;
  versions: {
    [version: string]: IApiVersion;
  };
}

export interface IApiVersion {
  added: string;
  updated: string;
  info: IApiInfo;
  swaggerUrl: string;
  swaggerYamlUrl?: string;
  openapiVer: string;
  link: string;
}

export interface IApiInfo {
  contact?: {
    email?: string;
    name?: string;
    url?: string;
    'x-twitter'?: string;
  };
  description: string;
  title: string;
  version: string;
  'x-apisguru-categories'?: string[];
  'x-logo'?: {
    backgroundColor?: string;
    url: string;
  };
  'x-origin'?: IOriginInfo[];
  'x-providerName'?: string;
}

export interface IOriginInfo {
  format: string;
  url: string;
  version: string;
}
