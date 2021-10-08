import { Validation, ValidationResponse } from '@/data/contracts'
import { mockValidationResponse } from '@/infra/test'

export class ValidationStub implements Validation {
  validate (input: object): ValidationResponse {
    return mockValidationResponse()
  }
}
