import moment from 'moment'
import { createSelector } from 'reselect'

const getStartingTime = state => state.game.startingTime
const getCurrentTime = state => state.game.currentTime

export const getElapsedTime = createSelector(
	getStartingTime,
	getCurrentTime,
	(startingTime, currentTime) => {
		if (startingTime && currentTime) {
			const seconds = moment(currentTime).diff(startingTime, 'seconds')
			const date = new Date(null)
			date.setSeconds(seconds) // specify value for SECONDS here
			const result = date.toISOString().substr(11, 8)
			const reduced = result.substring(3)
			return reduced
		}
		else {
			return "00:00"
		}
	}
)

export const startingTimeInUnixSeconds = state => moment(state.game.startingTime).unix()
export const currentTimeInUnixSeconds = state => moment(state.game.currentTime).unix()