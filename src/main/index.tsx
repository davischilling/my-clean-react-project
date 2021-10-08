import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import '@/presentation/styles/global.scss'
import { makeLoginPage, makeSurveyListPage } from './factories/presentation'

ReactDOM.render(
  <Router
    makeLoginPage={makeLoginPage}
    makeSurveyListPage={makeSurveyListPage}
  />,
  document.getElementById('main')
)
