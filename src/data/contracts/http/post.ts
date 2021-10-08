import { HttpResponse } from './http'

export interface HttpPostClient<R = any> {
  post: (params: HttpPostClient.Request) => Promise<HttpPostClient.Response<R>>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: any
  }
  export type Response<R> = HttpResponse<R>
}
