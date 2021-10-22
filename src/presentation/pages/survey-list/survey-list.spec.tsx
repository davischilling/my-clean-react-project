import React from 'react'
import { render, cleanup, RenderResult, waitFor, fireEvent, screen } from '@testing-library/react'

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

  test('should render 4 empty items on start', async () => {
    makeSut(loadSurveyList)
    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('should call LoadSurveyList', async () => {
    makeSut(loadSurveyList)

    expect(loadSurveyListSpy).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => screen.getByRole('heading'))
  })

  test('should render SurveyItems on success', async () => {
    makeSut(loadSurveyList)
    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })

  test('should render Error on failure', async () => {
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyList, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadSurveyList)
    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('should call LoadSurveyList on reload button click', async () => {
    jest.spyOn(loadSurveyList, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyList)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))

    expect(loadSurveyListSpy).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByRole('heading'))
  })
})
