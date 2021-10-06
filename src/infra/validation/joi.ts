import { Validation, ValidationResponse } from '@/data/contracts/validation'

import { Schema, ValidationResult } from 'joi'

export class JoiValidation implements Validation {
  constructor (
    private readonly schema: Schema
  ) {}

  validate (inputs: object): ValidationResponse {
    const { value, error, warning }: ValidationResult = this.schema.validate(inputs)
    return {
      value,
      error: error.message ?? error.message,
      warning: warning.message ?? warning.message
    }
  }
}
