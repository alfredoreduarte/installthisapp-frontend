import { createSelector } from 'reselect'
import { getSchema } from 'modules/example/selectors/schema'

export const initialStateSelectorForEditor = createSelector(
	getSchema,
	(schema) => {
		return {
			schema: schema,
		}
	}
)