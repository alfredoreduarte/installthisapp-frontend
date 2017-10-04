import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getSchema = state => {
	return _.orderBy(_.values(state.entities.schema), 'index', 'asc')
}