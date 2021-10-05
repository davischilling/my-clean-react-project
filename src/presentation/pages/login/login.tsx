import Styles from './login-styles.scss'
import { Logo, Spinner } from '@/presentation/components'

import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes </h1>
      </header>
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <footer className={Styles.footer}>
      </footer>
    </div>
  )
}

export default Login