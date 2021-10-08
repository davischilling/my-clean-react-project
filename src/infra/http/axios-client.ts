import { HttpPostClient } from '@/data/contracts/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostClient.Request): Promise<HttpPostClient.Response<any>> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(url, body)
    } catch (err) {
      httpResponse = err.response
    }
    return {
      statusCode: httpResponse.status,
      data: httpResponse.data
    }
  }
}
