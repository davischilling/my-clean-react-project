import { HttpPostClient, HttpStatusCode } from '@/data/contracts'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpPostClient.Response<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClient.Request<T>): Promise<HttpPostClient.Response<R>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
