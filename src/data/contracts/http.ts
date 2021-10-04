export interface HttpPostClient {
  post: (params: HttpPostClient.Request) => Promise<HttpPostClient.Response>
}

export namespace HttpPostClient {
  export type Request = {
    url: string
    body?: object
  }
  export type Response = {
    statusCode: HttpStatusCode
    body?: any
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
