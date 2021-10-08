import { HttpGetClient, HttpStatusCode } from '@/data/contracts'

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpGetClient.Response<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get ({ url }: HttpGetClient.Request): Promise<HttpGetClient.Response<R>> {
    this.url = url
    return this.response
  }
}
