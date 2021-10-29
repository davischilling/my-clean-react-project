import Login from './login'
import { InvalidCredentialsError } from '@/data/error'
import { ValidationStub } from '@/data/test'
import { AuthenticationStub } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import 'jest-localstorage-mock'
import { waitFor, cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

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
  let setCurrentAccountMock: typeof jest.fn

  beforeEach(() => {
    const validation = new ValidationStub()
    validateSpy = jest.spyOn(validation, 'validate')
    authentication = new AuthenticationStub()
    authenticationSpy = jest.spyOn(authentication, 'auth')
    setCurrentAccountMock = jest.fn()

    sut = render(
      <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccountMock
      }}>
        <Router history={history} >
          <Login
            validation={validation}
            authentication={authentication}
          />
        </Router>
      </ApiContext.Provider>
    )
  })

  afterEach(cleanup)

  test('should start with initial state', () => {
    const { getByTestId } = sut

    const emailWrap = getByTestId('email-wrap')
    const email = getByTestId('email')
    const emailLabel = getByTestId('email-label')

    const passwordWrap = getByTestId('password-wrap')
    const password = getByTestId('password')
    const passwordLabel = getByTestId('password-label')

    const submitButton = getByTestId('submit') as HTMLButtonElement
    const errorWrap = getByTestId('error-wrap')

    expect(emailWrap.getAttribute('data-status')).toBe('invalid')
    expect(email.title).toBe('Campo obrigatório')
    expect(emailLabel.title).toBe('Campo obrigatório')

    expect(passwordWrap.getAttribute('data-status')).toBe('invalid')
    expect(password.title).toBe('Campo obrigatório')
    expect(passwordLabel.title).toBe('Campo obrigatório')

    expect(submitButton.disabled).toBe(true)
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('should call Validation with correct email', () => {
    const email = faker.internet.email()
    populateEmailField(sut, email)

    expect(validateSpy).toHaveBeenCalledWith('email', { email })
  })

  test('should call Validation with correct password', () => {
    const password = faker.internet.password()
    populatePasswordField(sut, password)

    expect(validateSpy).toHaveBeenCalledWith('password', { password })
  })

  test('should show email error if Validation fails', () => {
    const validateResponse = {
      value: 'email',
      error: 'Email inválido'
    }
    validateSpy.mockReturnValueOnce(validateResponse)

    const { getByTestId } = sut
    populateEmailField(sut)
    const email = getByTestId('email')
    const emailLabel = getByTestId('email-label')

    expect(email.title).toBe(validateResponse.error)
    expect(emailLabel.title).toBe(validateResponse.error)
  })

  test('should show password error if Validation fails', () => {
    const validateResponse = {
      value: 'password',
      error: 'Password inválido'
    }
    validateSpy.mockReturnValueOnce(validateResponse)

    const { getByTestId } = sut
    populatePasswordField(sut)
    const password = getByTestId('password')
    const passwordLabel = getByTestId('password-label')

    expect(password.title).toBe(validateResponse.error)
    expect(passwordLabel.title).toBe(validateResponse.error)
  })

  test('should show valid state if Validation succeeds', () => {
    const { getByTestId } = sut

    populateEmailField(sut)
    const email = getByTestId('email')
    const emailLabel = getByTestId('email-label')

    populatePasswordField(sut)
    const password = getByTestId('password')
    const passwordLabel = getByTestId('password-label')

    expect(email.title).toBeFalsy()
    expect(emailLabel.title).toBeFalsy()
    expect(password.title).toBeFalsy()
    expect(passwordLabel.title).toBeFalsy()
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

  test('should call setCurrentAccount on success and navigates to main page', async () => {
    const { getByTestId } = sut

    simulateValidSubmit(sut)

    await waitFor(() => getByTestId('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authentication.account)
    expect(setCurrentAccountMock).toHaveReturnedTimes(1)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
})
