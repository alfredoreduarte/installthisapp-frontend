import { getFromApi, getExternal } from 'canvas/api'

export const receiveSettings = payload => ({
	type: 'RECEIVE_SETTINGS',
	payload,
})

export const fetchSettings = checksum => {
	return (dispatch, getState) =>{
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/settings.json`).then( response => {
			dispatch(receiveSettings(response))
		})
	}
}