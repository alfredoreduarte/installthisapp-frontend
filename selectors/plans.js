import _ from 'lodash'
import { createSelector } from 'reselect'

const allPlans = state => state.plans

export const getBasicPlanIfExists = createSelector(allPlans, plans => {
  if (plans.length > 0) {
    return plans[0]
  } else {
    return null
  }
})
