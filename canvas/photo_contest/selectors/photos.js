import _ from 'lodash'
import { createSelector } from 'reselect'

export const loggedUser = state => state.loggedUser
export const allPhotos = state => _.values(state.entities.photos)
export const currentSorting = state => state.sort
export const searchQuery = state => state.search

export const currentPhoto = (state, props) => {
	return _.find(_.values(state.entities.photos), {id: parseInt(props.params.photoId)})
}

export const sortedPhotos = createSelector(
	allPhotos,
	currentSorting,
	(photos, sorting) => {
		switch(sorting) {
			case 'mostRecent': 
				return _.orderBy(photos, p => Date.parse(p.createdAt), 'desc')
			case 'mostVoted': 
			default: 
				return _.orderBy(photos, p => p.votes.length, 'desc')
		}
	}
)

export const photosBySearchQuery = createSelector(
	sortedPhotos,
	searchQuery,
	(photos, query) => _.filter(photos, p => {
		const inc = _.includes(p.user.name.toLowerCase(), query.toLowerCase())
		return inc
	})
)

export const photosByUploaderId = createSelector(
	allPhotos,
	loggedUser,
	(photos, user) => {
		const elems = _.filter(photos, photo => photo.userId == user.id)
		return elems
	}
)