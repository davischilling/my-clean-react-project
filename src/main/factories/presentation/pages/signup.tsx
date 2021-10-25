import React from 'react'

import { makeRemoteAuthentication } from '@/main/factories/data'
import { makeLocalstorageAdapter, makesignUpValidations } from '@/main/factories/infra'
import { SignUp } from '@/presentation/pages'

export const makeSignUpPage: React.FC = () => {
  const path = '/login'
  return (
    <SignUp
      validation={makesignUpValidations()}
      authentication={makeRemoteAuthentication(`${process.env.API_URL}${path}`)}
      cache={makeLocalstorageAdapter()}
    />
  )
}
