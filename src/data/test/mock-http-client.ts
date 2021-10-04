import { HttpPostClient } from '../contracts'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post ({ url }: HttpPostClient.Params): Promise<void> {
    this.url = url
    return await Promise.resolve()
  }
}
