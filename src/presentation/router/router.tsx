import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

type Props = {
  makeLoginPage: React.FC
  makeSurveyListPage: React.FC
}

const Router: React.FC<Props> = ({ makeLoginPage, makeSurveyListPage }: Props) => {
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
