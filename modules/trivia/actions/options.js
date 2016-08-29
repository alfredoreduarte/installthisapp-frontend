import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config.dev'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'
import humps from 'humps'
import Cookies from 'js-cookie'

export const deleteOption = id => ({
	type: 'TRIVIA/DELETE_OPTION',
	id
})

export const postDeleteOptions = (checksum, ids) => {
	return dispatch => {
		const url = CONFIG.API_URL + `/applications/${checksum}/questions_destroy.json`
		const api_key = Cookies.get('api_key')
		return 	fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						'Content-Type': `application/json`,
					},
					body: JSON.stringify({
						id: ids
					})
				})
				.then(response => response.json())
				.then(json =>{
					console.log('deleted option', json)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}