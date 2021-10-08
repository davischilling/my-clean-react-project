import { mockAxiosResponse, mockPostRequest, mockGetRequest } from '@/infra/test'
import { HttpPostClient, HttpGetClient } from '@/data/contracts'
import { AxiosHttpClient } from './axios-client'

import axios, { AxiosStatic } from 'axios'

jest.mock('axios')

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    let mockedAxios: jest.Mocked<AxiosStatic>
    let request: HttpGetClient.Request
    let mockedAxiosResponse: {
      status: number
      data: any
    }
    let sut: AxiosHttpClient

    beforeAll(() => {
      mockedAxios = axios as jest.Mocked<typeof axios>
      mockedAxiosResponse = mockAxiosResponse()
      mockedAxios.get.mockResolvedValue(mockedAxiosResponse)
      request = mockGetRequest()
    })

    beforeEach(() => {
      sut = makeSut()
    })

    test('should call axios.get with correct values', async () => {
      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('should return correct response on axios.get', async () => {
      const httpResponse = await sut.get(request)

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        data: mockedAxiosResponse.data
      })
    })

    test('should return correct error on axios.get', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: mockedAxiosResponse
      })

      const httpResponse = await sut.get(request)

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        data: mockedAxiosResponse.data
      })
    })
  })

  describe('post', () => {
    let mockedAxios: jest.Mocked<AxiosStatic>
    let request: HttpPostClient.Request
    let mockedAxiosResponse: {
      status: number
      data: any
    }
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

    test('should call axios.post with correct values', async () => {
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('should return correct response on axios.post', async () => {
      const httpResponse = await sut.post(request)

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        data: mockedAxiosResponse.data
      })
    })

    test('should return correct error on axios.post', async () => {
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
})
