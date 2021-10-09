import React, { useContext } from 'react'

import { SurveyContext } from '@/presentation/pages/survey-list/components'
import Styles from './error-styles.scss'

const SurveyError: React.FC = () => {
  const { state: { error } } = useContext(SurveyContext)
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {error}
      </span>
      <button>Recarregar</button>
    </div>
  )
}

export default SurveyError
