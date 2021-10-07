import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import '@/presentation/styles/global.scss'
import { makeLoginPage } from './factories/presentation/pages/login'

ReactDOM.render(
  <Router
    makeLoginPage={makeLoginPage}
  />,
  document.getElementById('main')
)
