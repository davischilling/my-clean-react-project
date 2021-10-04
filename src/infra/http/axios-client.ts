import { HttpPostClient } from '@/data/contracts/http'

import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostClient.Request<any>): Promise<void> {
    await axios.post(params.url)
  }
}
