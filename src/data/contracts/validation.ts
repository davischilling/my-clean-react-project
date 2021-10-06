export type Schema = {
  validate: Validation['validate']
}

export type ValidationResponse = {
  error?: Error
  warning?: Error
  value: any
}

export interface Validation {
  validate: (input: object) => ValidationResponse
}
