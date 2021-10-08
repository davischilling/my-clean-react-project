import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { makeLoginPage, makeSurveyListPage } from '@/main/factories/presentation'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPage} />
        <Route path="/" exact component={makeSurveyListPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
