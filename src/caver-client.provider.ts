import Caver from 'caver-js';
import { CaverModuleAsyncOptions, CaverModuleOptions } from './caver.interface';
import { Provider } from '@nestjs/common';
import { CAVER_CLIENT, CAVER_MODULE_OPTIONS } from './caver.constants';
import { randomUUID } from 'crypto';
import { HttpProviderOptions } from 'caver-js/types/packages/caver-core-requestmanager/caver-providers-http/src';

export class CaverClientError extends Error {}
export interface CaverClient {
  key: string;
  clients: Map<string, Caver>;
}

export const getClient = async (
  options: CaverModuleOptions,
): Promise<Caver> => {
  const { url, headers } = options;
  if (headers) {
    return new Caver(
      new Caver.providers.HttpProvider(url, { headers } as HttpProviderOptions),
    );
  }
  return new Caver(url);
};

export const createClient = (): Provider => ({
  provide: CAVER_CLIENT,
  useFactory: async (
    options: CaverModuleOptions | CaverModuleOptions[],
  ): Promise<CaverClient> => {
    const clients = new Map<string, Caver>();
    const defaultKey = randomUUID();

    if (Array.isArray(options)) {
      await Promise.all(
        options.map(async (opt) => {
          const key = opt.name || defaultKey;
          if (clients.has(key)) {
            throw new CaverClientError(`caver client ${key} already exists`);
          }

          clients.set(key, await getClient(opt));
        }),
      );
    } else {
      const key = options.name || defaultKey;
      clients.set(key, await getClient(options));
    }

    return {
      key: defaultKey,
      clients,
    };
  },
  inject: [CAVER_MODULE_OPTIONS],
});

export const createAsyncClientOptions = (options: CaverModuleAsyncOptions) => ({
  provide: CAVER_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
