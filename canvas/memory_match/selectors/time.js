import moment from 'moment'
import { createSelector } from 'reselect'

const getStartingTime = state => state.game.startingTime
const getCurrentTime = state => state.game.currentTime

export const getElapsedTime = createSelector(
	getStartingTime,
	getCurrentTime,
	(startingTime, currentTime) => {
		return startingTime && currentTime ? moment(currentTime).diff(startingTime, 'seconds') : 0
	}
)

export const startingTimeInUnixSeconds = state => moment(state.game.startingTime).unix()
export const currentTimeInUnixSeconds = state => moment(state.game.currentTime).unix()