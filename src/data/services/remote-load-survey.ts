import { UnexpectedError } from '@/data/error/unexpected'
import { SurveyModel } from '@/domain/models/survey'
import { HttpGetClient, HttpStatusCode } from '@/data/contracts'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurvey implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.data
      default:
        throw new UnexpectedError()
    }
  }
}
