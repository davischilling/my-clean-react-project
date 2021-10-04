import { HttpPostClient } from '@/data/contracts/http'

import axios from 'axios'

export class AxiosHttpClient {
  async post ({ url, body }: HttpPostClient.Request<any>): Promise<void> {
    await axios.post(url, body)
  }
}
