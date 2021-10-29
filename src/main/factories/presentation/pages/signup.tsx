import React from 'react'

import { makeRemoteAddAccount } from '@/main/factories/data'
import { makesignUpValidations } from '@/main/factories/infra'
import { SignUp } from '@/presentation/pages'

export const makeSignUpPage: React.FC = () => {
  const path = '/signup'
  return (
    <SignUp
      validation={makesignUpValidations()}
      addAccount={makeRemoteAddAccount(`${process.env.API_URL}${path}`)}
    />
  )
}
