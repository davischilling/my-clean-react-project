import { HttpPostClient, HttpStatusCode } from '@/data/contracts'
import { EmailInUseError, UnexpectedError } from '@/data/error'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case (HttpStatusCode.ok):
        return httpResponse.data
      case (HttpStatusCode.forbidden):
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
