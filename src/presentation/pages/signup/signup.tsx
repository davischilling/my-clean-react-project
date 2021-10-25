import { Validation } from '@/data/contracts'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import Styles from './signup-styles.scss'

import React, { useEffect, useState } from 'react'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { LocalStorageAdapter } from '@/infra/cache'
import { useValidation } from '@/presentation/hooks'

type Props = {
  validation: Validation
  authentication: Authentication
  cache: LocalStorageAdapter
}

const SignUp: React.FC<Props> = ({ validation, authentication, cache }: Props) => {
  const history = useHistory()
  const defaultErrorMessage = 'Campo obrigatório'
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: defaultErrorMessage,
    emailError: defaultErrorMessage,
    passwordError: defaultErrorMessage,
    passwordConfirmationError: defaultErrorMessage,
    mainErrorMessage: '',
    fieldToValidate: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    //   try {
    //     if (state.isLoading || state.emailError || state.passwordError) {
    //       return
    //     }
    //     setState({ ...state, isLoading: true })
    //     const account = await authentication.auth({
    //       email: state.email,
    //       password: state.password
    //     })
    //     cache.set('accessToken', {
    //       accessToken: account.accessToken
    //     })
    history.replace('/')
    //   } catch (err) {
    //     setState({
    //       ...state,
    //       isLoading: false,
    //       mainErrorMessage: err.message
    //     })
    //   }
  }

  useEffect(() => {
    if (state.fieldToValidate !== '') {
      let objToValidate: object
      if (state.fieldToValidate[0] === 'passwordConfirmation') {
        objToValidate = {
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
        }
      } else {
        objToValidate = {
          [state.fieldToValidate]: state[`${state.fieldToValidate}`]
        }
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
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState, validation }}>
        <form data-testid="form" onSubmit={handleSubmit} className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
          <Link data-testid="signup-page" to="/login" className={Styles.link}>Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
