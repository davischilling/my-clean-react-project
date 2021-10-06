import Styles from './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

import React, { useContext, useEffect } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState, validation } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  useEffect(() => {
    if (state[`${props.name}`] !== '') {
      const { error } = validation.validate({ [`${props.name}`]: state[`${props.name}`] })
      if (error !== undefined) {
        setState({
          ...state,
          [`${props.name}Error`]: error
        })
      } else {
        setState({
          ...state,
          [`${props.name}Error`]: ''
        })
      }
    } else if (state[`${props.name}Error`] !== 'Campo obrigatório') {
      setState({
        ...state,
        [`${props.name}Error`]: 'Campo obrigatório'
      })
    }
  }, [state[`${props.name}`]])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    if (props.name !== '' && error === '') {
      return 'Tudo certo!'
    } else {
      return error
    }
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
