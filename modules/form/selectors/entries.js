import _ from 'lodash'
import moment from 'moment'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'
import { getSchema } from 'modules/form/selectors/schema'

const getAllEntries = state => _.values(state.formModule.entities.entries)

export const getFilteredEntries = createSelector(
	getAllEntries,
	getSchema,
	(entries, schema) => {
		const extractSchemaOrder = schema.map(field => field.id)
		const tableHeaders = schema.map(field => schema.question)
		const tableBody = entries.map((entry, index) => {
			const payload = entry.payload
			let idealReturn = extractSchemaOrder.map(order => {
				const correspondingResponse = _.find(payload, {'id': order})
				const result = correspondingResponse ? correspondingResponse.content : ''
				let toReturn = ''
				if (typeof result == 'object') {
					_.forIn(result, (value, key) => {
						if (value) {
							toReturn = toReturn + key + ', '
						}
					})
					toReturn = toReturn.slice(0, -2)
				}
				else{
					toReturn = result
				}
				return toReturn
			})
			idealReturn.push(moment(entry.createdAt).format("MMMM Do YYYY, h:mm:ss a"))
			return idealReturn
		})
		return tableBody
	}
)

export const getWinnerEntry = createSelector(
	getFilteredEntries,
	entries => _.sample(entries)
)