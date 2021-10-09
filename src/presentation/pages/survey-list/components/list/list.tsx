import React, { useContext } from 'react'

import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './list-styles.scss'
import { SurveyModel } from '@/domain/models'

const List: React.FC = () => {
  const { state: { surveys } } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {
        surveys.length
          ? surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
          : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
