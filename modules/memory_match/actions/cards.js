import v4 from 'node-uuid'
import { postFileToApi, deleteFromApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'

// Manage cards
export const createCard = files => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		const checksum = currentApp.checksum
		files.map(file => {
			const thisUUID = v4()
			dispatch(addCard({
				id: thisUUID,
				applicationId: currentApp.id,
				attachmentUrl: file.preview,
				status: 'uploading',
			}))
			dispatch(getSignedRequest(file, checksum)).then( url => {
				let formData = new FormData()
				formData.append('card[attachment_url]', url)
				return postFileToApi(`applications/${checksum}/cards_create.json`, formData).then(response => {
					console.log('resp')
					console.log(response)
					dispatch(removeCard(thisUUID))
					return dispatch(addCard(response))
				})
			})
		})
	}
}

export const deleteCard = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/cards_destroy.json`, { id }).then(response => {
			if (response.status == 'ok') {
				return dispatch(removeCard(id))
			}
		})
	}
}

export const removeCard = id => ({
	type: 'MEMORY_MATCH/REMOVE_CARD',
	id,
})

export const addCard = card => ({
	type: 'MEMORY_MATCH/ADD_CARD',
	card,
})

// Upload images

export const getSignedRequest = (file, checksum) => {
	return dispatch  => {
		return makeRequest('GET', `/sign-s3?file-name=memory-match-cards/${checksum}/${Date.now()}-${file.name}&file-type=${file.type}`)
		.then( response => {
			return JSON.parse(response)
		})
		.then( json => {
			return dispatch(uploadFile(file, json.signedRequest, json.url))
		})
		.catch( error => {
			console.error('Augh, there was an error!', error.statusText)
		})
	}
}
const makeRequest = (method, url) => {
	return new Promise( (resolve, reject) => {
		var xhr = new XMLHttpRequest()
		xhr.open(method, url)
		xhr.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response)
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				})
			}
		}
		xhr.onerror = function() {
			reject({
				status: this.status,
				statusText: xhr.statusText
			})
		}
		xhr.send()
	})
}
const uploadFile = (file, signedRequest, url) => {
	return dispatch => {
		return new Promise( ( resolve, reject ) => {
			const xhr = new XMLHttpRequest()
			xhr.open('PUT', signedRequest)
			xhr.onreadystatechange = () => {
				if ( xhr.readyState === 4 ) {
					if ( xhr.status === 200 ) {
						resolve(url)
					}
					else {
						reject({
							status: xhr.status,
							statusText: xhr.statusText
						})
						alert('Could not upload file.')
					}
				}
			}
			xhr.send(file)
		})		
	}
}