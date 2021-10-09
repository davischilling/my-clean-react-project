import React from 'react'
import { render, cleanup, RenderResult, waitFor } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListStub } from '@/data/test'
import { UnexpectedError } from '@/data/error'

const makeSut = (loadSurveyList: LoadSurveyListStub): RenderResult => {
  return render(
    <SurveyList loadSurveyList={loadSurveyList} />
  )
}

describe('SurveyList Page', () => {
  let loadSurveyList: LoadSurveyListStub
  let loadSurveyListSpy: jest.SpyInstance

  beforeEach(() => {
    loadSurveyList = new LoadSurveyListStub()
    loadSurveyListSpy = jest.spyOn(loadSurveyList, 'loadAll')
  })

  afterEach(cleanup)

  test('should render 4 empty items on start', () => {
    const sut = makeSut(loadSurveyList)
    const surveyList = sut.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(sut.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should call LoadSurveyList', async () => {
    const sut = makeSut(loadSurveyList)

    expect(loadSurveyListSpy).toHaveBeenCalledTimes(1)
    expect(sut.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => sut.getByRole('heading'))
  })

  test('should render SurveyItems on success', async () => {
    const sut = makeSut(loadSurveyList)
    const surveyList = sut.getByTestId('survey-list')

    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })

  test('should render Error on failure', async () => {
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyList, 'loadAll').mockRejectedValueOnce(error)

    const sut = makeSut(loadSurveyList)
    await waitFor(() => sut.getByRole('heading'))

    expect(sut.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(sut.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
