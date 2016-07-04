import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from '../lib/stringmatch'
import { getCurrentApp } from './apps'

const usersSelector = state => state.entities.users
const filterTextSelector = state => state.filterText

const currentUsersSelector = (users, app) => {
	if (app) {
		const selectedUsers = _.filter(
			users,
			user => _.includes(app.users, user.id)
		)
		return selectedUsers
	}
	else{
		return []
	}
}

const currentUsersByText = (users, text) => {
	return users.filter(user => stringContains(user.name, text))
}

export const getCurrentUsers = createSelector(
	usersSelector,
	getCurrentApp,
	currentUsersSelector
)

export const getCurrentUsersByText = createSelector(
	getCurrentUsers,
	filterTextSelector,
	currentUsersByText
)