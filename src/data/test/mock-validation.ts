import { Validation, ValidationResponse } from '@/data/contracts'

export class ValidationStub implements Validation {
  validate (input: object): ValidationResponse {
    return { value: 'any_value' }
  }
}
