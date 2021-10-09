import { HttpPostClient, HttpGetClient } from '@/data/contracts/http'

import faker from 'faker'

export const mockGetRequest = (): HttpGetClient.Request => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export const mockPostRequest = (): HttpPostClient.Request => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockAxiosResponse = (): {
  status: number
  data: any
} => ({
  status: faker.datatype.number(),
  data: faker.random.objectElement()
})
