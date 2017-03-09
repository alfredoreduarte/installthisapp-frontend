import { postFileToApi } from 'canvas/api'
import { togglePhotoUploadIndicator } from 'canvas/photo_contest/actions/activityIndicators'

export const getSignedRequest = file => {
	return (dispatch, getState)  => {
		dispatch(togglePhotoUploadIndicator())
		const applicationChecksum = getState().applicationData.checksum
		return makeRequest('GET', `/sign-s3?file-name=photo-contest-photos/${applicationChecksum}/${Date.now()}-${file.name}&file-type=${file.type}`)
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

export const postPhoto = body => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		return postFileToApi(`${checksum}/upload.json`, body)
				.then(response => {
					dispatch(togglePhotoUploadIndicator())
					return Promise.resolve(response)
				})
	}
}