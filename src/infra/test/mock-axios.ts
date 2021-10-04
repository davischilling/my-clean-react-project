import { HttpPostClient } from '@/data/contracts/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostClient.Request<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockAxiosResponse = (): any => ({
  status: faker.datatype.number(),
  data: faker.random.objectElement()
})
