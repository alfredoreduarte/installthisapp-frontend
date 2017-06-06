import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import { receiveEntities } from 'modules/trivia/actions/entities'

export const deleteOption = id => ({
	type: 'TRIVIA/DELETE_OPTION',
	id
})

export const postDeleteOptions = (checksum, ids) => {
	return dispatch => {
		const url = `applications/${checksum}/questions_destroy.json`
		return 	deleteFromApi(url,
					{
						id: ids
					}
				)
				.then(response =>{
					console.log('deleted option', response)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}