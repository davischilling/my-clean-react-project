import { HttpPostClient, HttpGetClient, HttpResponse } from '@/data/contracts/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post ({ url, body }: HttpPostClient.Request): Promise<HttpPostClient.Response<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(url, body)
    } catch (err) {
      axiosResponse = err.response
    }
    return this.adapt(axiosResponse)
  }

  async get ({ url }: HttpGetClient.Request): Promise<HttpGetClient.Response<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.get(url)
    } catch (err) {
      axiosResponse = err.response
    }
    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    }
  }
}
