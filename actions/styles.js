import 'isomorphic-fetch'
import css from 'css'
import * as CONFIG from 'config.dev'
import { updateCoords } from 'actions/design-helper/mouseTrap'
import { getFromApi, postToApi } from 'api'

export const fetchJsonTest = () => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return getFromApi(`applications/${checksum}/jsontest.json`)
				.then(response => console.log(response))
	}
}

export const setHoveredSelector = selector => {
	const classesWithDots = selector.map( sel => '.' + sel )
	return {
		type: 'SET_HOVERED_SELECTOR',
		payload: classesWithDots
	}
}

export const setActiveSelector = () => {
	return {
		type: 'SET_ACTIVE_SELECTOR'
	}
}

export const modifyWholeSheet = (selectors, property, value) => {
	return {
		type: 'MODIFY_STYLE',
		selectors,
		property,
		value
	}
}

export const setPlatform = platform => {
	return {
		type: 'SET_EDITOR_PLATFORM',
		payload: platform
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
		const cssString = css.stringify(getState().styles.ruleset)
		const checksum = getState().admin.currentApp
		return postToApi(`applications/${checksum}/save_app_from_editor.json`, 
				{
					css: cssString,
					messages: {hola: 'chau'}
				}).then(response => console.log(response))
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