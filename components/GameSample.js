import React from 'react'
import { connect } from 'react-redux'
import PreviewsTrivia from 'canvas/trivia/containers/Previews'
import PreviewsPhotoContest from 'canvas/photo_contest/containers/Previews'
import PreviewsTopFans from 'canvas/top_fans/containers/Previews'

const GameSample = ({ screen, previews, messages, coso }) => (
	<div>
		{previews == 'photo_contest' ? <PreviewsPhotoContest screen={screen} messages={messages} /> : null}
		{previews == 'trivia' ? <PreviewsTrivia screen={screen} messages={messages} /> : null}
		{previews == 'top_fans' ? <PreviewsTopFans screen={screen} messages={messages} /> : null}
	</div>
)

const mapStateToProps = (state, ownProps) => {
	// const coso = require(`../canvas/${ownProps.previews}/containers/Previews`).default
	// const coso = require(`!babel!../canvas/${ownProps.previews}/containers/Previews`).default
	// const defaultStyles = require(`!css!sass!../assets/canvas/${params.application.application_type}.sass`).toString()
	// console.log('coso')
	// console.log(coso)
	// console.log(React.isValidElement(coso))
	return {
		screen: state.styles.screen,
		// coso,
	}	
}

export default connect(mapStateToProps)(GameSample)