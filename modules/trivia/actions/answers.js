import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'
import humps from 'humps'
import Cookies from 'js-cookie'

export const deleteAnswer = id => ({
	type: 'TRIVIA/DELETE_ANSWER',
	id
})

export const postDeleteAnswers = (checksum, ids) => {
	return dispatch => {
		const url = CONFIG.API_URL + `/applications/${checksum}/answers_destroy.json`
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
					ids.map(id => dispatch(deleteAnswer(id)))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}