import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Canvas from 'components/design-editor/DesignEditorCanvas'
import Sidebar from 'containers/DesignEditorSidebar'
import BottomBar from 'containers/DesignEditorBottomBar'
import { fetchStyles } from 'actions/styles'

class DesignEditor extends Component {
	componentDidMount() {
		this.props.kickFetchStyles()
	}
	render(){
		const { loaded, platform } = this.props
		return (
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
	}
}

const mapStateToProps = state => {
	const loaded = state.styles.ruleset.stylesheet ? true : false
	return { 
		loaded,
		platform: state.styles.platform,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return { 
		kickFetchStyles: () => dispatch(fetchStyles(props.params.checksum))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditor)