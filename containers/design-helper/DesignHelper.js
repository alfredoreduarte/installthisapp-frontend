import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import MouseTrap from 'components/design-helper/MouseTrap'
import { updateCoords, updateSelector } from 'actions/design-helper/mouseTrap'
import { setCurrentSelector } from 'actions/styles'

const DesignHelper = ({ coords, handleHover, handleClick }) => (
	<div>
		<MouseTrap 
			pos={coords} 
			handleClick={() => handleClick()} />
		<div className="actualGame" onMouseOver={handleHover}>
			<h1 className="game-title ita-app-title">App Title</h1>
			<p className="text-success ita-subtitle">Maecenas sed diam</p>
		</div>
	</div>
)

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
			dispatch(setCurrentSelector(classArray))
		}
		else{
			return false
		}
	}
}

const mapStateToProps = (state, props) => {
	return { 
		coords: state.mouseTrap
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return { 
		handleHover: e => {
			let elem = e.target
			while(findEditableNodeOnHover(dispatch, elem) == false){
				if (elem.parentNode) {
					elem = elem.parentNode
				}
			}
		},
		handleClick: () => {
			console.log('click!')
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignHelper)