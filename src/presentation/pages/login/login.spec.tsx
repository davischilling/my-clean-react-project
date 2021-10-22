import Login from './login'
import { InvalidCredentialsError } from '@/data/error'
import { ValidationStub } from '@/data/test'
import { AuthenticationStub } from '@/domain/test'

import 'jest-localstorage-mock'
import { waitFor, cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { LocalStorageAdapterStub } from '@/infra/test'

const populateEmailField = (sut: RenderResult, email: string = faker.internet.email()): void => {
  const { getByTestId } = sut
  const emailInput = getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password: string = faker.internet.password()): void => {
  const { getByTestId } = sut
  const passwordInput = getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (sut: RenderResult, email?: string, password?: string): void => {
  const { getByTestId } = sut
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = getByTestId('submit')
  fireEvent.click(submitButton)
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

describe('Login Component', () => {
  let sut: RenderResult
  let validateSpy: jest.SpyInstance
  let authenticationSpy: jest.SpyInstance
  let authentication: AuthenticationStub
  let localstorage: LocalStorageAdapterStub
  let localstorageSetSpy: jest.SpyInstance

  beforeEach(() => {
    // localStorage.clear()
    const validation = new ValidationStub()
    validateSpy = jest.spyOn(validation, 'validate')
    authentication = new AuthenticationStub()
    authenticationSpy = jest.spyOn(authentication, 'auth')
    localstorage = new LocalStorageAdapterStub()
    localstorageSetSpy = jest.spyOn(localstorage, 'set')

    sut = render(
      <Router history={history} >
        <Login validation={validation} authentication={authentication} localstorage={localstorage} />
      </Router>
    )
  })

  afterEach(cleanup)

  test('should start with initial state', () => {
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')
    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should call Validation with correct email', () => {
    const email = faker.internet.email()
    populateEmailField(sut, email)

    expect(validateSpy).toHaveBeenCalledWith({ email })
  })

  test('should call Validation with correct password', () => {
    const password = faker.internet.password()
    populatePasswordField(sut, password)

    expect(validateSpy).toHaveBeenCalledWith({ password })
  })

  test('should show email error if Validation fails', () => {
    const validateResponse = {
      value: 'email',
      error: faker.random.words()
    }
    validateSpy.mockReturnValueOnce(validateResponse)

    const { getByTestId } = sut
    populateEmailField(sut)
    const emailStatus = getByTestId('email-status')

    expect(emailStatus.title).toBe(validateResponse.error)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should show password error if Validation fails', () => {
    const validateResponse = {
      value: 'password',
      error: faker.random.words()
    }
    validateSpy.mockReturnValueOnce(validateResponse)

    const { getByTestId } = sut
    populatePasswordField(sut)
    const passwordStatus = getByTestId('password-status')

    expect(passwordStatus.title).toBe(validateResponse.error)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show valid state if Validation succeeds', () => {
    const { getByTestId } = sut

    populateEmailField(sut)
    const emailStatus = getByTestId('email-status')

    populatePasswordField(sut)
    const passwordStatus = getByTestId('password-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('should disable submit button only if form is invalid', () => {
    const { getByTestId } = sut

    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { getByTestId } = sut

    simulateValidSubmit(sut)

    const spinner = getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values on submit', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy).toHaveBeenCalledWith({
      email,
      password
    })
  })

  test('should call Authentication only once', () => {
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy).toHaveBeenCalledTimes(1)
  })

  test('should not call Authentication if form is invalid', () => {
    const { getByTestId } = sut

    const validateResponse = {
      value: 'password',
      error: faker.random.words()
    }
    validateSpy.mockReturnValueOnce(validateResponse)

    populateEmailField(sut)
    fireEvent.submit(getByTestId('form'))

    expect(authenticationSpy).toHaveBeenCalledTimes(0)
  })

  test('should present error if Authentication fails', async () => {
    const { getByTestId } = sut
    const error = new InvalidCredentialsError()

    authenticationSpy.mockResolvedValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)
    const errorWrap = getByTestId('error-wrap')
    await waitFor(() => errorWrap)

    const mainErrorMessage = getByTestId('main-error')

    expect(mainErrorMessage.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('should add accessToken to localstorage on success and navigates to main page', async () => {
    const { getByTestId } = sut

    simulateValidSubmit(sut)

    await waitFor(() => getByTestId('form'))

    expect(localstorageSetSpy).toHaveBeenCalledWith('accessToken', {
      accessToken: authentication.account.accessToken
    })
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', () => {
    const { getByTestId } = sut

    const signUpPage = getByTestId('signup-page')
    fireEvent.click(signUpPage)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
