import _ from 'lodash'
import { createSelector } from 'reselect'

export const allPhotos = state => _.values(state.entities.photos)

export const currentPhoto = (state, props) => _.find(_.values(state.entities.photos), {id: parseInt(props.params.photoId)})