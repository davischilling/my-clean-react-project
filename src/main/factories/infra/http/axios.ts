import { AxiosHttpClient } from '@/infra/http/axios-client'

export const makeHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
