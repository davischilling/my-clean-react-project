import { Validation } from '@/data/contracts'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import Styles from './login-styles.scss'

import React, { useState } from 'react'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { LocalStorageAdapter } from '@/infra/cache'

type Props = {
  validation: Validation
  authentication: Authentication
  localstorage: LocalStorageAdapter
}

const Login: React.FC<Props> = ({ validation, authentication, localstorage }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainErrorMessage: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localstorage.set('accessToken', {
        accessToken: account.accessToken
      })
      history.replace('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        mainErrorMessage: err.message
      })
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form data-testid="form" onSubmit={handleSubmit} className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
          <Link data-testid="signup-page" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
