import { Inject, Injectable } from '@nestjs/common';
import { CaverClient, CaverClientError } from './caver-client.provider';
import { CAVER_CLIENT } from './caver.constants';
import Caver from 'caver-js';

@Injectable()
export class CaverService {
  constructor(
    @Inject(CAVER_CLIENT)
    private readonly caverClient: CaverClient,
  ) {}

  getClient(name?: string): Caver {
    if (!name) {
      name = this.caverClient.key;
    }

    if (!this.caverClient.clients.has(name)) {
      throw new CaverClientError(`Client ${name} doesnt exists`);
    }

    return this.caverClient.clients.get(name);
  }

  getClients(): Map<string, Caver> {
    return this.caverClient.clients;
  }
}
