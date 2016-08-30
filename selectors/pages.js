import _ from 'lodash'
import { createSelector } from 'reselect'

export const getAllPages = state => _.values(state.entities.pages)

export const getPageForNewApp = state => _.find(state.entities.pages, {'identifier': state.newApp.pageId})