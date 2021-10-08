import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListStub } from '@/data/test'

describe('SurveyList Component', () => {
  let loadSurveyListSpy: jest.SpyInstance
  let sut: RenderResult

  beforeEach(() => {
    const loadSurveyList = new LoadSurveyListStub()
    loadSurveyListSpy = jest.spyOn(loadSurveyList, 'loadAll')

    sut = render(
      <SurveyList loadSurveyList={loadSurveyList} />
    )
  })

  afterEach(cleanup)

  test('should render 4 empty items on start', () => {
    const surveyList = sut.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('should call LoadSurveyList', () => {
    expect(loadSurveyListSpy).toHaveBeenCalledTimes(1)
  })
})
