export type Schema = {
  validate: Validation['validate']
}

export type ValidationResponse = {
  error?: string
  warning?: string
  value: any
}

export interface Validation {
  validate: (input: object) => ValidationResponse
}
