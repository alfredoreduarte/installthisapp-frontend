import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Frame from 'react-frame-component'
import DesignHelper from 'containers/design-helper/DesignHelper'
import { getStringifiedRuleset } from 'selectors/styles'

const DesignEditorCanvas = ({ platform, styles }) => (
	<div className="row">
		<div className={`ita-canvas ${platform}`}>
			<Frame className="ita-canvas-frame">
				<div className="styles" dangerouslySetInnerHTML={{__html: styles}}></div>
				<DesignHelper />
			</Frame>
		</div>
	</div>
)

DesignEditorCanvas.propTypes = {
	platform: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
	styles: getStringifiedRuleset(state)
})

export default connect(mapStateToProps)(DesignEditorCanvas)