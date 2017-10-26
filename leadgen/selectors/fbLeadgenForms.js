import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAllPages } from 'selectors/pages'

export const getFbLeadgenForms = state => state.fbLeadgenForms
