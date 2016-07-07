import React, { Component, PropTypes } from 'react'

const DesignEditorCanvas = ({ platform }) => (
	<div className="row">
		<div className={`ita-canvas ${platform}`}>
			<iframe className="ita-canvas-frame" />
		</div>
	</div>
)

export default DesignEditorCanvas