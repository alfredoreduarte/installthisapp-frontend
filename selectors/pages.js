import _ from 'lodash'
import { createSelector } from 'reselect'

export const getAllPages = state => _.values(state.entities.pages)