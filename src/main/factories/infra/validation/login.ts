import { JoiValidation } from '@/infra/validation/joi'
import { signInValidations } from '@/main/validation'

export const makeLoginValidations = (): JoiValidation => {
  return new JoiValidation(signInValidations)
}
