import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentApp } from 'selectors/apps'

const usersSelector = state => state.entities.users
const filterTextSelector = state => state.filterText
const usersSorterSelector = state => state.usersSorting

const usersForCurrentApp = (users, app, sorter) => {
	if (app) {
		const selectedUsers = _.filter(users, u => _.includes(app.users, u.id))
		return _.sortBy(selectedUsers, sorter)
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
	usersSorterSelector,
	usersForCurrentApp
)

export const getCurrentUsersByText = createSelector(
	getCurrentUsers,
	filterTextSelector,
	currentUsersByText
)