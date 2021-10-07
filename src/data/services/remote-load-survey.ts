import { HttpGetClient } from '@/data/contracts'
// import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurvey implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
