export interface HttpPostClient<T, R> {
  post: (params: HttpPostClient.Request<T>) => Promise<HttpPostClient.Response<R>>
}

export namespace HttpPostClient {
  export type Request<T> = {
    url: string
    body?: T
  }
  export type Response<R> = {
    statusCode: HttpStatusCode
    data?: R
  }
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}
