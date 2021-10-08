import { RemoteLoadSurvey } from '@/data/services'
import { makeHttpClient } from '@/main/factories/infra/http/axios'

export const makeRemoteLoadSurvey = (url: string): RemoteLoadSurvey => {
  return new RemoteLoadSurvey(url, makeHttpClient())
}
