import { Validation } from '@/data/contracts'
import { AddAccount } from '@/domain/usecases'
import { LocalStorageAdapter } from '@/infra/cache'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { useValidation } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { SignUpType } from './signup-type'

type Props = {
  validation: Validation
  addAccount: AddAccount
  cache: LocalStorageAdapter
}

const SignUp: React.FC<Props> = ({ validation, addAccount, cache }: Props) => {
  const history = useHistory()
  const defaultErrorMessage = 'Campo obrigatório'
  const [state, setState] = useState<SignUpType>({
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
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      cache.set('accessToken', {
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
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
          autoComplete="off"
        >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link data-testid="signup-page" to="/login" className={Styles.link}>Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
