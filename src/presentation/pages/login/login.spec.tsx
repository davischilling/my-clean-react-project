import React from 'react'
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/data/test/mock-validation'

import faker from 'faker'

describe('Login Component', () => {
  let sut: RenderResult
  let validateSpy: jest.SpyInstance

  beforeEach(() => {
    const validation = new ValidationStub()
    validateSpy = jest.spyOn(validation, 'validate')
    sut = render(<Login validation={validation} />)
  })

  afterEach(cleanup)

  test('should start with initial state', () => {
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    const submitButton = getByTestId('submit') as HTMLButtonElement
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should call Validation with correct email', () => {
    const { getByTestId } = sut

    const emailInput = getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    expect(validateSpy).toHaveBeenCalledWith({ email })
  })

  test('should call Validation with correct password', () => {
    const { getByTestId } = sut

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validateSpy).toHaveBeenCalledWith({ password })
  })
})
