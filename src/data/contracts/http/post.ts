export interface HttpPostClient<R = any> {
  post: (params: HttpPostClient.Request) => Promise<HttpPostClient.Response<R>>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: any
  }
  export type Response<R = any> = {
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
