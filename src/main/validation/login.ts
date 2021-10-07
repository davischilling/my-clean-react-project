import { SchemaField } from '@/infra/validation/joi'

import Joi from 'joi'

const passwordPattern = /^[a-zA-Z0-9]{3,30}$/

export const signInValidations: SchemaField[] = [
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
