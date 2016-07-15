import 'isomorphic-fetch'
import css from 'css'
import * as CONFIG from 'config.dev'
import { updateCoords } from 'actions/design-helper/mouseTrap'

export const receiveStyles = string => {
	const cssObject = css.parse(string)
	return {
		type: 'RECEIVE_STYLES',
		payload: cssObject
	}
}

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

export const fetchStyles = checksum => {
	return (dispatch) => {
		const url = CONFIG.BASE_URL + `/apps/styles/${checksum}`
		return 	fetch(url)
				.then(response => response.text())
				.then(text =>{
					dispatch(receiveStyles(text))
				})
				.catch(exception =>
					console.log('fetchStyles: parsing failed', exception)
				)
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