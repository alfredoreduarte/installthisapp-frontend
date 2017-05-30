import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Frame from 'react-frame-component'
import DesignHelper from 'containers/design-helper/DesignHelper'
import { getStringifiedRuleset } from 'selectors/styles'

const Canvas = ({ previews, platform, styles }) => (
	<div className="row">
		<div className={`ita-canvas ${platform}`}>
			<Frame 
				className="ita-canvas-frame" 
				head={
					<link 
						rel="stylesheet" 
						href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />}>
				<div className="styles" dangerouslySetInnerHTML={{__html: styles}}></div>
				<DesignHelper previews={previews} />
			</Frame>
		</div>
	</div>
)

Canvas.propTypes = {
	platform: PropTypes.string.isRequired,
	previews: PropTypes.string.isRequired,
	styles: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
	styles: getStringifiedRuleset(state)
})

export default connect(mapStateToProps)(Canvas)