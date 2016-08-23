import 'isomorphic-fetch'
import css from 'css'
import * as CONFIG from 'config.dev'
import { updateCoords } from 'actions/design-helper/mouseTrap'
import { readFromApi } from 'api'

export const setHoveredSelector = selector => {
	const classesWithDots = selector.map(sel => '.' + sel)
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

export const modifyDesign = (selectors, property, value) => {
	console.log('modify', selectors)
	return {
		type: 'SET_STYLES_RESULT',
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

export const fetchStyles = checksum => {
	return dispatch =>
		readFromApi(`applications/${checksum}/styles.json`, response => {
			console.log(response.stylesheet_url)
			dispatch(fetchFromAws(response.stylesheet_url))
		})
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