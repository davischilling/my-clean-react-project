import { HttpPostClient } from '@/data/contracts'
import { AxiosHttpClient } from './axios-client'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostClient.Request<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  let mockedAxios: typeof axios
  let request: HttpPostClient.Request<any>

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
    request = mockPostRequest()
  })

  test('should call axios with correct values', async () => {
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
