import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getAllPhotos = state => _.values(state.entities.photos)

export const getFilteredEntries = createSelector(getAllPhotos, entries => {
	return _.filter(entries, entry => entry.id > 0)
})

export const getCurrentPhoto = (state, props) => {
	return _.find(_.values(state.entities.photos), { id: parseInt(props.params.photoId) })
}

export const getPhotoForUser = (state, props) => {
	return _.find(_.values(state.entities.photos), photo => {
		return photo.user.id == state.loggedUser.id
	})
}
