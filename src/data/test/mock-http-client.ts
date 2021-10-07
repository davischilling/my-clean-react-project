import { HttpPostClient, HttpStatusCode } from '@/data/contracts'

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpPostClient.Response<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClient.Request): Promise<HttpPostClient.Response<R>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
