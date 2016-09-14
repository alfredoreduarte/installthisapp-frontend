import React from 'react'
import { connect } from 'react-redux'
import PreviewsTrivia from 'canvas/trivia/containers/Previews'
import PreviewsPhotoContest from 'canvas/photo_contest/containers/Previews'

const GameSample = ({ screen, previews }) => (
	<div>
		{previews == 'photo_contest' ? <PreviewsPhotoContest screen={screen} /> : null}
		{previews == 'trivia' ? <PreviewsTrivia screen={screen} /> : null}
	</div>
)

const mapStateToProps = (state, ownProps) => {
	return {
		screen: state.styles.screen,
	}	
}

export default connect(mapStateToProps)(GameSample)