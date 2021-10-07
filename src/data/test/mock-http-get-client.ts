import { HttpGetClient } from '@/data/contracts'

export class HttpGetClientSpy implements HttpGetClient {
  url: string

  async get ({ url }: HttpGetClient.Request): Promise<void> {
    this.url = url
  }
}
