import { HttpPostClient } from '@/data/contracts/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostClient.Request): Promise<HttpPostClient.Response<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(url, body)
    } catch (err) {
      axiosResponse = err.response
    }
    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    }
  }
}
