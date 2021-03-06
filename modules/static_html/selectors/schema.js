import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getSchema = state => _.values(state.static_html.entities.schema)