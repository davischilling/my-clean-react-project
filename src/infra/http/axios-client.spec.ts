import { mockAxiosResponse, mockPostRequest } from '@/infra/test'
import { HttpPostClient } from '@/data/contracts'
import { AxiosHttpClient } from './axios-client'

import axios, { AxiosStatic } from 'axios'

jest.mock('axios')

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  let mockedAxios: jest.Mocked<AxiosStatic>
  let request: HttpPostClient.Request<any>
  let mockedAxiosResponse: any
  let sut: AxiosHttpClient

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxiosResponse = mockAxiosResponse()
    mockedAxios.post.mockResolvedValue(mockedAxiosResponse)
    request = mockPostRequest()
  })

  beforeEach(() => {
    sut = makeSut()
  })

  test('should call axios with correct values', async () => {
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const httpResponse = await sut.post(request)

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      data: mockedAxiosResponse.data
    })
  })

  test('should return the correct statusCode and body on failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: mockedAxiosResponse
    })

    const httpResponse = await sut.post(request)

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      data: mockedAxiosResponse.data
    })
  })
})
