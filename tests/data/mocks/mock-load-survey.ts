import { LoadSurveyList } from '@/domain/usecases'

import faker from 'faker'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListStub implements LoadSurveyList {
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    return mockSurveyListModel()
  }
}
