import React from 'react'
import { connect } from 'react-redux'
import Canvas from 'components/design-editor/DesignEditorCanvas'
import Sidebar from 'containers/DesignEditorSidebar'
import BottomBar from 'containers/DesignEditorBottomBar'

const Design = ({ platform }) => (
	<div>
		<Canvas platform={platform} />
		<Sidebar />
		<BottomBar />
	</div>
)

const mapStateToProps = state => ({ 
	platform: state.styles.platform,
})

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(Design)