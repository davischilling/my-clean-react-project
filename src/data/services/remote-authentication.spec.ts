import { mockAuthenticationParams } from './../../domain/test/mock-authentication'
import { HttpPostClientSpy } from './../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  let url: string

  beforeEach(() => {
    url = faker.internet.url()
  })

  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthenticationParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut(url)
    const authParams = mockAuthenticationParams()

    await sut.auth(authParams)

    expect(httpPostClientSpy.body).toEqual(authParams)
  })
})
