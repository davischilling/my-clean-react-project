import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'
import { FormContext } from '@/presentation/contexts'

import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} /> }
      { errorMessage && <span className={Styles.error}>{errorMessage}</span> }
    </div>
  )
}

export default FormStatus
