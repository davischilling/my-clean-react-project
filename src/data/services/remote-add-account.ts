import { HttpPostClient, HttpStatusCode } from '@/data/contracts'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'
import { EmailInUseError } from '@/data/error'

export class RemoteAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccount.Params): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case (HttpStatusCode.ok):
        return
      default:
        throw new EmailInUseError()
    }
  }
}
