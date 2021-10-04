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
  noContent = 204,
  unauthorized = 401
}
