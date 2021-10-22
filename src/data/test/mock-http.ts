import { HttpGetClient, HttpStatusCode, HttpPostClient } from '@/data/contracts'

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
