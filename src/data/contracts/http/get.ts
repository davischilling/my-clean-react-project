export interface HttpGetClient {
  get: (params: HttpGetClient.Request) => Promise<void>
}

export namespace HttpGetClient {
  export type Request = {
    url: string
  }
  export type Response = {}
}
