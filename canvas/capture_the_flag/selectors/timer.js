import toHHMMSS from 'lib/toHHMMSS'

export const getTimer = state => {
	if (state.entities.timeLeft > 0) {
		return toHHMMSS(state.entities.timeLeft)
	} else {
		return '00:00:00'
	}
}
