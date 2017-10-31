import { toHHMMSS } from 'canvas/capture_the_flag/selectors/entries'

export const getTimer = state => {
	return toHHMMSS(state.entities.timeLeft)
}
