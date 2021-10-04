import { HttpPostClient, HttpStatusCode } from '@/data/contracts'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpPostClient.Response = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClient.Request): Promise<HttpPostClient.Response> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
