import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DesignEditorCanvas from 'components/design-editor/DesignEditorCanvas'
import DesignEditorSidebar from 'containers/DesignEditorSidebar'
import DesignEditorBottomBar from 'containers/DesignEditorBottomBar'
import { fetchStyles } from 'actions/styles'

class DesignEditor extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchStyles('LF7H3'))
	}
	render(){
		const { loaded, selector } = this.props
		return (
			<div>
				{loaded ? (
					<div>
						<DesignEditorCanvas
							platform="mobile"
							/>
						<DesignEditorSidebar selector={selector} />
						<DesignEditorBottomBar />
					</div>
				) : 'cargando estilos'}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return { 
		loaded: state.styles.ruleset.stylesheet ? true : false,
		selector: state.styles.currentSelector
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return { 
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditor)