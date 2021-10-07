import { Validation, ValidationResponse } from '@/data/contracts/validation'

import { Schema, ValidationResult } from 'joi'

export type SchemaField = {
  field: string
  schema: Schema
}

export class JoiValidation implements Validation {
  constructor (
    private readonly schema: SchemaField[]
  ) {}

  validate (input: object): ValidationResponse {
    const inputField = Object.getOwnPropertyNames(input)[0]
    const fieldToValidate = this.schema.find(element => element.field === inputField)
    const { value, error, warning }: ValidationResult = fieldToValidate.schema.validate(input)
    return {
      value,
      error: error !== undefined ? error.message : '',
      warning: warning !== undefined ? warning.message : ''
    }
  }
}
