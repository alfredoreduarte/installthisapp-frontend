import toHHMMSS from 'lib/toHHMMSS'

export const getTimer = state => {
	return toHHMMSS(state.entities.timeLeft)
}
