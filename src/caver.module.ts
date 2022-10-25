import { CaverModuleAsyncOptions, CaverModuleOptions } from './caver.interface';
import { DynamicModule, Module } from '@nestjs/common';
import { CaverCoreModule } from './caver-core.module';

@Module({})
export class CaverModule {
  static forRoot(
    options: CaverModuleOptions | CaverModuleOptions[],
  ): DynamicModule {
    return {
      module: CaverModule,
      imports: [CaverCoreModule.register(options)],
    };
  }

  static forRootAsync(options: CaverModuleAsyncOptions): DynamicModule {
    return {
      module: CaverModule,
      imports: [CaverCoreModule.forRootAsync(options)],
    };
  }
}
