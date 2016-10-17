import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'
import { deleteFromApi } from 'api'

export const deleteAnswer = id => ({
	type: 'TRIVIA/DELETE_ANSWER',
	id
})

export const postDeleteAnswers = (checksum, ids) => {
	return dispatch => {
		return 	deleteFromApi(
					`applications/${checksum}/answers_destroy.json`,
					{
						id: ids
					}
				)
				.then(response => {
					ids.map(id => dispatch(deleteAnswer(id)))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}