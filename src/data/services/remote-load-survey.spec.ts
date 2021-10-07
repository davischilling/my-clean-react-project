import { HttpGetClientSpy } from './../test/mock-http-get-client'
import { RemoteLoadSurvey } from './remote-load-survey'

import faker from 'faker'

describe('RemoteLoadSurvey', () => {
  let url: string
  let sut: RemoteLoadSurvey
  let httpGetClientSpy: HttpGetClientSpy

  beforeEach(() => {
    url = faker.internet.url()
    httpGetClientSpy = new HttpGetClientSpy()
    sut = new RemoteLoadSurvey(url, httpGetClientSpy)
  })

  test('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
