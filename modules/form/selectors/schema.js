import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

// export const getSchema = state => _.values(state.formModule.entities.schema)

export const getSchema = state => {
	return _.orderBy(_.values(state.formModule.entities.schema), 'index', 'asc')
}