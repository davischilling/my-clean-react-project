import { HttpPostClient } from '@/data/contracts'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccount.Params): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
