import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Styles from './login-styles.scss'

import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="email" placeholder="Digite sua senha" />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
