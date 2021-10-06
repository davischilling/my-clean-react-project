import { Validation, ValidationResponse } from '@/data/contracts/validation'

import { Schema } from 'joi'

export class JoiValidation implements Validation {
  constructor (
    private readonly schema: Schema
  ) {}

  validate (inputs: object): ValidationResponse {
    return this.schema.validate(inputs)
  }
}
