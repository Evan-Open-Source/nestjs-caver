import { ModuleMetadata } from '@nestjs/common';

export interface CaverModuleOptions {
  name?: string;
  url: string;
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
