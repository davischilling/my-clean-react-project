import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { makeLoginPage, makeSignUpPage, makeSurveyListPage } from '@/main/factories/presentation'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '../adapters'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLoginPage} />
          <Route path="/signup" exact component={makeSignUpPage} />
          <Route path="/" exact component={makeSurveyListPage} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
