import { HttpResponse } from './http'

export interface HttpGetClient<R> {
  get: (params: HttpGetClient.Request) => Promise<HttpGetClient.Response<R>>
}

export namespace HttpGetClient {
  export type Request = {
    url: string
  }
  export type Response<R = any> = HttpResponse<R>
}
