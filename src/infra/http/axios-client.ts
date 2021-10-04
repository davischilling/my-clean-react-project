import { HttpPostClient } from '@/data/contracts/http'

import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post ({ url, body }: HttpPostClient.Request<any>): Promise<HttpPostClient.Response<any>> {
    const httpResponse = await axios.post(url, body)
    return {
      statusCode: httpResponse.status,
      data: httpResponse.data
    }
  }
}
