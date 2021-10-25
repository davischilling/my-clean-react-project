import { Validation, ValidationResponse } from '@/data/contracts'
import { mockValidationResponse } from '@/infra/test'

export class ValidationStub implements Validation {
  validate (field: string, objToValidate: object): ValidationResponse {
    return mockValidationResponse()
  }
}
