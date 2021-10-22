import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/data'
import { makeLoginValidations, makeLocalstorageAdapter } from '@/main/factories/infra'

import React from 'react'

export const makeLoginPage: React.FC = () => {
  const path = '/login'
  return (
    <Login
      validation={makeLoginValidations()}
      authentication={makeRemoteAuthentication(`${process.env.API_URL}${path}`)}
      cache={makeLocalstorageAdapter()}
    />
  )
}
