import 'isomorphic-fetch'
import css from 'css'
import { updateCoords } from 'actions/design-helper/mouseTrap'
import { toggleActivitySavingDesign } from 'actions/activityIndicators'
import { getCurrentAppByState } from 'selectors/apps'
import { getFromApi, postToApi, postFileToApi } from 'api'
import { getCurrentAppChecksumByState } from 'selectors/apps'

export const setCurrentScreen = screen => {
	return {
		type: 'SET_SCREEN',
		screen,
	}
}

export const fetchJsonTest = () => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return getFromApi(`applications/${checksum}/jsontest.json`)
				.then(response => console.log('jsontest', response))
	}
}

export const setActiveEditedContent = () => {
	return {
		type: 'SET_MESSAGE_KEY'
	}
}

export const setHoveredMessage = key => {
	return {
		type: 'SET_HOVERED_KEY',
		payload: key,
	}
}

export const editMessage = (key, value) => {
	return {
		type: 'EDIT_MESSAGES',
		key,
		value,
	}
}

const fetchMessagesFromAws = url => {
	return (dispatch, getState) => {
		return fetch(url, {
					method: 'GET',
				})
				.then(response => response.text())
				.then(json => {
					const currentApp = getCurrentAppByState(getState())
					let defaultMessages = require(`modules/${currentApp.applicationType}/messages`).default
					const procJson = JSON.parse(json)
					const messages = { ...defaultMessages, ...procJson}
					dispatch(receiveMessages(messages))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return getFromApi(`applications/${checksum}/messages.json`)
				.then(response => dispatch(fetchMessagesFromAws(response.messagesUrl)))
	}
}

const receiveMessages = messages => {
	return {
		type: 'RECEIVE_MESSAGES',
		payload: messages
	}
}

// Images
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
export const getSignedRequest = file => {
	return (dispatch, getState)  => {
		const applicationChecksum = getCurrentAppChecksumByState(getState())
		return makeRequest('GET', `/sign-s3?file-name=application-assets/${applicationChecksum}/images/${Date.now()}-${file.name}&file-type=${file.type}`)
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

// Deprecated:
// 
// export const saveImage = body => {
// 	return (dispatch, getState) => {
// 		dispatch(toggleActivitySavingDesign())
// 		const checksum = getState().admin.currentApp
// 		return postFileToApi(`applications/${checksum}/save_image_from_new_editor.json`, body)
// 				.then(response => {
// 					console.log('res', response)
// 					dispatch(toggleActivitySavingDesign())
// 					return Promise.resolve(response)
// 				})
// 	}
// }

export const editImage = (key, value) => {
	return {
		type: 'EDIT_IMAGES',
		key,
		value,
	}
}
const fetchImagesFromAws = url => {
	return (dispatch, getState) => {
		if (url) {
			return fetch(url, {
						method: 'GET',
					})
					.then(response => response.text())
					.then(json => {
						const currentApp = getCurrentAppByState(getState())
						let defaultImages = require(`modules/${currentApp.applicationType}/images`).default
						const procJson = JSON.parse(json)
						const images = { ...defaultImages, ...procJson}
						dispatch(receiveImages(images))
					})
					.catch(exception =>
						console.log('parsing failed', exception)
					)
		}
		else {
			const currentApp = getCurrentAppByState(getState())
			let defaultImages = require(`modules/${currentApp.applicationType}/images`).default
			const images = { ...defaultImages}
			dispatch(receiveImages(images))
			return Promise.resolve(true)
		}
	}
}

export const fetchImages = () => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return getFromApi(`applications/${checksum}/images.json`)
				.then(response => dispatch(fetchImagesFromAws(response.imagesUrl)))
	}
}

const receiveImages = images => {
	return {
		type: 'RECEIVE_IMAGES',
		payload: images
	}
}
// images

export const setHoveredSelector = selector => {
	const classesWithDots = selector.map( sel => sel == 'body' ? sel : `.${sel}`)
	return {
		type: 'SET_HOVERED_SELECTOR',
		payload: classesWithDots
	}
}

export const resetActiveSelector = () => {
	return {
		type: 'RESET_ACTIVE_SELECTOR'
	}
}

export const setContentEditor = () => ({
	type: 'SET_CONTENT_EDITOR'
})

export const setActiveSelector = (selectors = false) => {
	if (selectors) {
		return {
			type: 'SET_ACTIVE_SELECTOR',
			payload: selectors
		}
	}
	else {
		return {
			type: 'SET_ACTIVE_SELECTOR'
		}
	}
}

export const modifyWholeSheet = (property, value) => {
	return (dispatch, getState) => {
		const selectors = getState().styles.activeSelector
		return dispatch({
			type: 'MODIFY_STYLE',
			selectors,
			property,
			value,
		})
	}	
}

export const setPlatform = platform => {
	return {
		type: 'SET_EDITOR_PLATFORM',
		payload: platform
	}
}

export const resetDefaultStyles = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		const defaultStyles = require(`!css!sass!../assets/canvas/${currentApp.applicationType}.sass`).toString()
		dispatch(receiveStyles(defaultStyles))
	}
}

const receiveStyles = string => {
	const cssObject = css.parse(string)
	return {
		type: 'RECEIVE_STYLES',
		payload: cssObject
	}
}

const fetchFromAws = url => {
	return dispatch => {
		return fetch(url, {
					method: 'GET'
				})
				.then(response => response.text())
				.then(text => dispatch(receiveStyles(text)))
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const fetchStyles = () => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return getFromApi(`applications/${checksum}/styles.json`)
				.then(response => dispatch(fetchFromAws(response.stylesheetUrl)))
	}	
}

export const saveStyles = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivitySavingDesign())
		const cssString = css.stringify(getState().styles.ruleset)
		const checksum = getState().admin.currentApp
		const editedMessages = getState().styles.messages
		const messages = JSON.stringify(editedMessages)
		const editedImages = getState().styles.images
		const images = JSON.stringify(editedImages)
		return postToApi(`applications/${checksum}/save_app_from_editor.json`, 
				{
					css: cssString,
					messages,
					images,
				}).then(response => dispatch(toggleActivitySavingDesign()))
	}
}

// HoverHandler

const hasEditableClass = (element, index, array) => {
	return (element.substring(0,4) == 'ita-' && element != 'ita-design-editor-daemon')
}

const findEditableNodeOnHover = (dispatch, element) => {
	if (element.classList) {
		const classArray = _.toArray(element.classList)
		if(classArray.some(hasEditableClass)){
			const data = {
				x: element.getBoundingClientRect().left,
				y: element.getBoundingClientRect().top,
				w: element.getBoundingClientRect().width,
				h: element.getBoundingClientRect().height,
			}
			dispatch(updateCoords(data))
			dispatch(setHoveredMessage(element.getAttribute('data-editable-message-key')))
			dispatch(setHoveredSelector(classArray))
		}
		else{
			return false
		}
	}
}

export const handleHover = e => {
	return dispatch => {
		let elem = e.target
		while(findEditableNodeOnHover(dispatch, elem) == false){
			if (elem.parentNode) {
				elem = elem.parentNode
			}
		}
	}
}

export const resetMouseTrap = e => {
	return dispatch => {
		const data = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
		}
		dispatch(updateCoords(data))
	}
}