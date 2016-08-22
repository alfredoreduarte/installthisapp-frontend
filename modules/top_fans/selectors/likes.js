import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllLikes = state => state.topFans.likes

export const getLikesForPage = createSelector(
	getAllLikes,
	getCurrentApp,
	(likes, app) => {
		if (app) {
			// console.log('likes')
			// console.log(app.facebookPageIdentifier)
			// console.log(likes[app.facebookPageIdentifier])
			if (likes[app.facebookPageIdentifier]){
				return likes[app.facebookPageIdentifier]
			}
			else{
				return []
			}
		}
		else{
			return []
		}
	}
)