import _ from 'lodash'
import { createSelector } from 'reselect'

export const allPhotos = state => _.values(state.entities.photos)