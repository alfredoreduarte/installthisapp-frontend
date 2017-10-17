import { createSelector } from 'reselect'
import { getSchema } from 'modules/form/selectors/schema'

export const initialStateSelectorForEditor = createSelector(
	getSchema,
	(schema) => {
		return {
			schema: schema,
		}
	}
)