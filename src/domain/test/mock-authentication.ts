import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from './mock-account'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class AuthenticationStub implements Authentication {
  account = mockAccountModel()
  async auth (params: Authentication.Params): Promise<AccountModel> {
    return await Promise.resolve(this.account)
  }
}
