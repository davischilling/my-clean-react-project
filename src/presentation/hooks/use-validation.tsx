import { Validation } from '@/data/contracts'
import React from 'react'

export const useValidation = (
  state: { fieldToValidate: string },
  setState: React.Dispatch<React.SetStateAction<{}>>,
  objToValidate: object,
  validation: Validation,
  defaultMessage: string
): void => {
  if (state[state.fieldToValidate] !== '') {
    const { error } = validation.validate(state.fieldToValidate[0], objToValidate)
    if (error !== undefined) {
      setState({
        ...state,
        [`${state.fieldToValidate}Error`]: error
      })
    } else {
      setState({
        ...state,
        [`${state.fieldToValidate}Error`]: ''
      })
    }
  } else if (state[`${state.fieldToValidate}Error`] !== defaultMessage) {
    setState({
      ...state,
      [`${state.fieldToValidate}Error`]: defaultMessage
    })
  }
}

export default useValidation
