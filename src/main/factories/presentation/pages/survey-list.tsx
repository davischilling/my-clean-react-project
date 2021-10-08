import React from 'react'

import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurvey } from '@/main/factories/data'

export const makeSurveyListPage: React.FC = () => {
  const path = '/'
  return (
    <SurveyList loadSurveyList={makeRemoteLoadSurvey(`${process.env.API_URL}${path}`)} />
  )
}
