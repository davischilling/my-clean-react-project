import { makeHttpClient } from '@/main/factories/infra/http/axios'
import { RemoteAddAccount } from '@/data/services'

export const makeRemoteAddAccount = (url: string): RemoteAddAccount => {
  return new RemoteAddAccount(url, makeHttpClient())
}
