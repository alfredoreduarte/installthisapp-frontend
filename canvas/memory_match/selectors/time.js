import moment from 'moment'
import { createSelector } from 'reselect'

const getTimeString = state => state.game.currentTime

export const getCurrentTime = createSelector(
	getTimeString,
	startingTime => {
		return startingTime ? moment().diff(startingTime, 'seconds') : 0
	}
)