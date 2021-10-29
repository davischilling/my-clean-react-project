import { Validation } from '@/data/contracts'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import Styles from './login-styles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { useValidation } from '@/presentation/hooks'
import { LoginType } from './login-type'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const defaultErrorMessage = 'Campo obrigatório'

  const [state, setState] = useState<LoginType>({
    isLoading: false,
    email: '',
    password: '',
    emailError: defaultErrorMessage,
    passwordError: defaultErrorMessage,
    mainErrorMessage: '',
    fieldToValidate: '',
    isFormValid: false
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || !state.isFormValid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        mainErrorMessage: err.message
      })
    }
  }

  useEffect(() => {
    if (state.fieldToValidate !== '') {
      const objToValidate = {
        [state.fieldToValidate]: state[`${state.fieldToValidate}`]
      }
      useValidation(
        state,
        setState,
        objToValidate,
        validation,
        defaultErrorMessage)
    }
  }, [state[state.fieldToValidate]])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
          autoComplete="off"
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="signup-page" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
