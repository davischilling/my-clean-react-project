import { HttpStatusCode } from '@/data/contracts'
import { EmailInUseError } from '@/data/error'
import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
import { RemoteAddAccount } from './remote-add-account'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AccountModel>
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  let url: string

  beforeEach(() => {
    url = faker.internet.url()
  })

  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut(url)
    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
