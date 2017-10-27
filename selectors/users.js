import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentApp } from 'selectors/apps'

const usersSelector = state => state.entities.users
const filterTextSelector = state => state.filterText
const usersSorterSelector = state => state.usersSorting

const usersForCurrentApp = (users, app, sorter) => {
	const selectedUsers = _.filter(users, u => _.includes(app.users, u.id))
	return _.sortBy(selectedUsers, sorter)
}

const usersByKeyword = (users, text) => {
	return users.filter(user => stringContains(user.name, text))
}

export const getUsersForCurrentApp = createSelector(usersSelector, getCurrentApp, usersSorterSelector, usersForCurrentApp)

export const getCurrentUsersByKeyword = createSelector(getUsersForCurrentApp, filterTextSelector, usersByKeyword)
