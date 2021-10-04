import { AxiosHttpClient } from './axios-client'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let mockedAxios: typeof axios
  let url: string

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
    url = faker.internet.url()
  })

  test('should call axios with correct URL', async () => {
    const sut = new AxiosHttpClient()

    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
