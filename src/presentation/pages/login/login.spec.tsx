import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  let sut: RenderResult

  beforeEach(() => {
    sut = render(<Login />)
  })

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
})
