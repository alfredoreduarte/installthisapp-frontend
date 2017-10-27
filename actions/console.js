import { getFromApi, postToApi, deleteFromApi, patchToApi } from 'api'

export const authenticatedGet = () => {
	return (dispatch, getState) => {
		const state = getState()
		const endpoint = state.form.apiConsole.values.authenticatedGet
		getFromApi(endpoint, response => {
			console.log('Response from authenticatedGet')
			console.log(response)
		})
	}
}

export const authenticatedPost = () => {
	return (dispatch, getState) => {
		const state = getState()
		const endpoint = state.form.apiConsole.values.authenticatedPost
		getFromApi(endpoint, response => {
			console.log('Response from authenticatedPost')
			console.log(response)
		})
	}
}

export const anonGet = () => {
	return (dispatch, getState) => {
		const state = getState()
		const endpoint = state.form.apiConsole.values.anonGet
		getFromApi(endpoint, response => {
			console.log('Response from anonGet')
			console.log(response)
		})
	}
}
