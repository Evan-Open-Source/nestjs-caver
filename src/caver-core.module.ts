import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { CaverModuleAsyncOptions, CaverModuleOptions } from './caver.interface';
import { CAVER_CLIENT, CAVER_MODULE_OPTIONS } from './caver.constants';
import {
  CaverClient,
  createAsyncClientOptions,
  createClient,
} from './caver-client.provider';
import { CaverService } from './caver.service';
import { WebsocketProvider } from 'caver-js/packages/caver-core-requestmanager';

@Global()
@Module({
  providers: [CaverService],
  exports: [CaverService],
})
export class CaverCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(CAVER_MODULE_OPTIONS)
    private readonly options: CaverModuleOptions | CaverModuleOptions[],
    @Inject(CAVER_CLIENT)
    private readonly caverClient: CaverClient,
  ) {}

  static register(
    options: CaverModuleOptions | CaverModuleOptions[],
  ): DynamicModule {
    return {
      module: CaverCoreModule,
      providers: [
        createClient(),
        { provide: CAVER_MODULE_OPTIONS, useValue: options },
      ],
      exports: [CaverService],
    };
  }

  static forRootAsync(options: CaverModuleAsyncOptions): DynamicModule {
    return {
      module: CaverCoreModule,
      imports: options.imports,
      providers: [createClient(), createAsyncClientOptions(options)],
      exports: [CaverService],
    };
  }

  onModuleDestroy(): void {
    const closeConnection =
      ({ clients, key }: CaverClient) =>
      (options: CaverModuleOptions) => {
        const name = options.name || key;
        const client = clients.get(name);

        if (client) {
          const provider = client.currentProvider as WebsocketProvider;
          provider.disconnect();
        }
      };

    const closeClientConnection = closeConnection(this.caverClient);

    if (Array.isArray(this.options)) {
      this.options.forEach(closeClientConnection);
    } else {
      closeClientConnection(this.options);
    }
  }
}
