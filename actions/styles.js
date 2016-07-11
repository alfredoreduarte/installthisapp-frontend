import 'isomorphic-fetch'
import css from 'css'
import * as CONFIG from 'config.dev'

export const receiveStyles = string => {
	const cssObject = css.parse(string)
	return {
		type: 'RECEIVE_STYLES',
		payload: cssObject
	}
}

export const setCurrentSelector = selector => {
	const classesWithDots = selector.map(sel => '.' + sel)
	return {
		type: 'SET_STYLES_SELECTOR',
		payload: classesWithDots
	}
}

export const modifyDesign = object => {
	return {
		type: 'SET_STYLES_RESULT',
		payload: object
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