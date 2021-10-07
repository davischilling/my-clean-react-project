import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

type Props = {
  makeLoginPage: React.FC
}

const Router: React.FC<Props> = ({ makeLoginPage }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
