import React, { PropTypes } from 'react'
import Frame from 'react-frame-component'
import { searchText } from 'actions/filterText'
import DesignHelper from 'containers/design-helper/DesignHelper'

const DesignEditorCanvas = ({ platform }) => (
	<div className="row">
		<div className={`ita-canvas ${platform}`}>
			<Frame 
				className="ita-canvas-frame" 
				head={<link type='text/css' rel='stylesheet' href='/styles/module.css' />}>
				<DesignHelper />
			</Frame>
		</div>
	</div>
)

DesignEditorCanvas.propTypes = {
	platform: PropTypes.string.isRequired,
}

export default DesignEditorCanvas