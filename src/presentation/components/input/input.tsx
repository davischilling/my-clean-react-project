import Styles from './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

import React, { useContext, useRef } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      fieldToValidate: [e.target.name]
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=' '
        data-testid={props.name}
        readOnly onFocus={e => { e.target.readOnly = false }}
        onChange={handleChange}
      />
      <label
        htmlFor="placeholder"
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}>
          {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
