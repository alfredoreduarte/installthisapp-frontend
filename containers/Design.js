import React from 'react'
import { connect } from 'react-redux'
import Canvas from 'components/design-editor/DesignEditorCanvas'
import Sidebar from 'containers/DesignEditorSidebar'
import BottomBar from 'containers/DesignEditorBottomBar'
import { setCurrentAppChecksum } from 'actions/apps'
import { fetchStyles } from 'actions/styles'

const Design = ({ loaded, platform }) => (
	<div>
		{loaded ? (
			<div>
				<Canvas
					platform={platform}
					/>
				<Sidebar />
				<BottomBar />
			</div>
		) : 'cargando estilos'}
	</div>
)

const mapStateToProps = state => {
	// Para saber si ya se cargó el css
	const loaded = state.styles.ruleset.stylesheet ? true : false
	return { 
		loaded,
		platform: state.styles.platform,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(setCurrentAppChecksum(props.params.checksum))
	dispatch(fetchStyles(props.params.checksum))
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Design)