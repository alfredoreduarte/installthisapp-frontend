import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import PreviewsTrivia from 'canvas/trivia/containers/Previews'
import PreviewsPhotoContest from 'canvas/photo_contest/containers/Previews'
import PreviewsTopFans from 'canvas/top_fans/containers/Previews'
import PreviewsMemoryMatch from 'canvas/memory_match/containers/Previews'
import PreviewsCatalog from 'canvas/catalog/containers/Previews'

const GameSample = ({ screen, previews, messages, images, settings, coso }) => (
	<div>
		{previews == 'photo_contest' ? (
			<PreviewsPhotoContest screen={screen} messages={messages} images={images} settings={settings} />
		) : null}
		{previews == 'trivia' ? <PreviewsTrivia screen={screen} messages={messages} images={images} settings={settings} /> : null}
		{previews == 'top_fans' ? <PreviewsTopFans screen={screen} messages={messages} images={images} settings={settings} /> : null}
		{previews == 'memory_match' ? (
			<PreviewsMemoryMatch screen={screen} messages={messages} images={images} settings={settings} />
		) : null}
		{previews == 'catalog' ? <PreviewsCatalog screen={screen} messages={messages} images={images} settings={settings} /> : null}
	</div>
)

const mapStateToProps = (state, ownProps) => {
	return {
		screen: state.styles.screen,
	}
}

GameSample.propTypes = {
	previews: PropTypes.string.isRequired,
	screen: PropTypes.string.isRequired,
	messages: PropTypes.object.isRequired,
	images: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(GameSample)
