import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { makeLoginPage, makeSignUpPage, makeSurveyListPage } from '@/main/factories/presentation'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPage} />
        <Route path="/signup" exact component={makeSignUpPage} />
        <Route path="/" exact component={makeSurveyListPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
