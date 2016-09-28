import _ from 'lodash'
import { createSelector } from 'reselect'

// export const getEntries = state => state.entries
export const getEntries = state => _.merge(state.entries.likes, state.entries.comments)
// export const getLikesForPage = state => state.topFans.likes
// export const getLikesForPage = state => {
// 	console.log('state que tengo')
// 	console.log(state)
// 	return state.topFans.likes[Object.keys(state.topFans.likes)[0]]
// }