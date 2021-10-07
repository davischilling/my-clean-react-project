import { makeHttpClient } from '@/main/factories/infra/http/axios'
import { RemoteAuthentication } from '@/data/services/remote-authentication'

export const makeRemoteAuthentication = (url: string): RemoteAuthentication => {
  return new RemoteAuthentication(url, makeHttpClient())
}
