import { HttpResponse } from './http'

export interface HttpGetClient<R = any> {
  get: (params: HttpGetClient.Request) => Promise<HttpGetClient.Response<R>>
}

export namespace HttpGetClient {
  export type Request = {
    url: string
    headers?: any
  }
  export type Response<R = any> = HttpResponse<R>
}
