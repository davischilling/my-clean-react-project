import { SurveyModel } from '@/domain/models/survey'
import { UnexpectedError } from '@/data/error/unexpected'
import { HttpStatusCode } from '@/data/contracts/http'
import { HttpGetClientSpy } from '@/data/test/mock-http-get-client'
import { RemoteLoadSurvey } from './remote-load-survey'

import faker from 'faker'

describe('RemoteLoadSurvey', () => {
  let url: string
  let sut: RemoteLoadSurvey
  let httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>

  beforeEach(() => {
    url = faker.internet.url()
    httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
    sut = new RemoteLoadSurvey(url, httpGetClientSpy)
  })

  test('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
