import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Styles from './login-styles.scss'
import { FormContext } from '@/presentation/contexts'

import React, { useEffect, useState } from 'react'
import { Validation } from '@/data/contracts'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainErrorMessage: ''
  })

  useEffect(() => {
    const { error } = validation.validate({ email: state.email })
    if (error !== undefined) {
      setState({
        ...state,
        emailError: error
      })
    }
  }, [state.email])
  useEffect(() => {
    const { error } = validation.validate({ password: state.password })
    if (error !== undefined) {
      setState({
        ...state,
        passwordError: error
      })
    }
  }, [state.password])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
