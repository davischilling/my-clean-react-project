import { InvalidCredentialsError } from '@/data/error'
import { Authentication } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/contracts'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: Authentication.Params): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        return await Promise.resolve()
    }
  }
}
