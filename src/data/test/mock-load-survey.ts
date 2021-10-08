import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

export class LoadSurveyListStub implements LoadSurveyList {
  async loadAll (): Promise<SurveyModel[]> {
    return mockSurveyListModel()
  }
}
