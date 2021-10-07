// import { SurveyModel } from '@/domain/models'

export interface LoadSurveyList {
  // loadAll: () => Promise<SurveyModel>
  loadAll: () => Promise<void>
}
