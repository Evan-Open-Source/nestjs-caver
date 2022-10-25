# Caver module for NestJS that allow to work with blockhains, Especially Klaytn

This is first release of this module. Readme under construction but here are a couple of tips

## Installation

#### Yarn
`yarn add nest-caver`

#### NPM
`yarn add nest-caver`

## Getting started with module

Register CaverModule module in yours `app.module.ts` (or other main module of yours project)

```typescript
import { Module } from '@nestjs/common';
import { CaverModule } from 'nest-caver';

@Module({
    imports: [
        CaverModule.forRoot({
            name: 'klay',
            url: 'http://localhost:3450',
        }),
    ]
})
export class AppModule {}

```

Or with Async

```typescript
import { Module } from '@nestjs/common';
import { CaverModule } from 'nest-caver';

@Module({
    imports: [
        CaverModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.get('caver'),
            inject:[ConfigService]
        }),
    ]
})
export class AppModule {}
```

### Configuration

For now module accept two parameters:

```typescript
export interface CaverModuleOptions {
  name?: string;
  url: string;
}
```

### Using in project

```typescript
import { Injectable } from '@nestjs/common';
import { CaverService } from "nest-caver";

@Injectable()
export class SomeClass {
    constructor(
        private readonly caverService: CaverService
    ) {}
    
    async method(): Promise<number> {
        const client = this.caverService.getClient('klay'); // we are give name of client in config file
        return await client.klay.getChainId();
    }
}
```

Available methods and API of caver available here https://klaytn.gitbook.io/docs/bapp/sdk/caver-js
