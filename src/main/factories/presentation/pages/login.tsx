import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/data/services/remote-authentication'
import { makeLoginValidations } from '@/main/factories/infra/validation/login'

import React from 'react'

export const makeLoginPage: React.FC = () => {
  const path = '/login'
  return (
    <Login
      validation={makeLoginValidations()}
      authentication={makeRemoteAuthentication(`process.env.API_URL${path}`)}
    />
  )
}
