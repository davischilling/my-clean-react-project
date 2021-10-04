import { AxiosHttpClient } from './axios-client'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  let mockedAxios: typeof axios
  let url: string

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
    url = faker.internet.url()
  })

  test('should call axios with correct URL and verb', async () => {
    const sut = makeSut()

    await sut.post({ url })

    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
