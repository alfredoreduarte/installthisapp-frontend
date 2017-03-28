import { deleteFromApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'

export const deleteEntry = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/entries_destroy.json`, { id }).then(response => {
			if (response.status == 'ok') {
				return dispatch(removeEntry(id))
			}
		})
	}
}

export const removeEntry = id => ({
	type: 'MEMORY_MATCH/REMOVE_ENTRY',
	id,
})