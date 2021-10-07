import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/data/services/remote-authentication'
import { makeLoginValidations } from '@/main/factories/infra/validation/login'

import React from 'react'

export const makeLoginPage: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  return (
    <Login
      validation={makeLoginValidations()}
      authentication={makeRemoteAuthentication(url)}
    />
  )
}
