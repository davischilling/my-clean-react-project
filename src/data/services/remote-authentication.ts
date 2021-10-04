import { InvalidCredentialsError, UnexpectedError, NotFoundError, ServerError } from '@/data/error'
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
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      case HttpStatusCode.serverError:
        throw new ServerError()
      default:
        throw new UnexpectedError()
    }
  }
}
