import React, { Component, PropTypes } from 'react'
import DesignEditorCanvas from 'components/DesignEditorCanvas'
import DesignEditorSidebar from 'containers/DesignEditorSidebar'
import DesignEditorBottomBar from 'containers/DesignEditorBottomBar'

const DesignEditor = () => (
	<div className="">
		<DesignEditorCanvas
			platform="mobile"
			/>
		<DesignEditorSidebar />
		<DesignEditorBottomBar />
	</div>
)

export default DesignEditor