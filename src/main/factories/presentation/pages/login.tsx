import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/data'
import { makeLoginValidations } from '@/main/factories/infra'

import React from 'react'

export const makeLoginPage: React.FC = () =>
  <Login
    validation={makeLoginValidations()}
    authentication={makeRemoteAuthentication()}
  />
