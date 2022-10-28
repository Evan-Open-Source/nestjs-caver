import { ModuleMetadata } from '@nestjs/common';

export interface KASAuthorizationHeader {
  name?: string;
  value?: string;
}

export interface CaverModuleOptions {
  name?: string;
  url: string;
  headers?: KASAuthorizationHeader[];
}

export interface CaverModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) =>
    | CaverModuleOptions
    | CaverModuleOptions[]
    | Promise<CaverModuleOptions>
    | Promise<CaverModuleOptions[]>;
  inject?: any[];
}
