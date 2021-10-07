import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/services'
import { AxiosHttpClient } from '@/infra/http/axios-client'
import { JoiValidation, SchemaField } from '@/infra/validation/joi'

import Joi from 'joi'

const passwordPattern = /^[a-zA-Z0-9]{3,30}$/

const signInValidations: SchemaField[] = [
  {
    field: 'email',
    schema: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
    })
  },
  {
    field: 'password',
    schema: Joi.object({
      password: Joi.string()
        .pattern(new RegExp(passwordPattern)).required()
    })
      .xor('password')
  }
]

export const makeLoginPage: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validation = new JoiValidation(signInValidations)
  return (
    <Login
      validation={validation}
      authentication={remoteAuthentication}
    />
  )
}
