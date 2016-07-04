import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from './app'

const usersSelector = state => state.entities.users

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
	users.filter((user) => user.startsWith(text));
}

export const getCurrentUsers = createSelector(
	usersSelector,
	getCurrentApp,
	currentUsersSelector
)

export const getCurrentUsersByText = createSelector(
	getCurrentUsers,
	currentUsersByText
)