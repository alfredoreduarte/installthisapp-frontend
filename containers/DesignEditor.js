import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Canvas from 'components/design-editor/DesignEditorCanvas'
import Sidebar from 'containers/DesignEditorSidebar'
import BottomBar from 'containers/DesignEditorBottomBar'
import { fetchStyles } from 'actions/styles'
import { getRulesetForCurrentSelector as getRuleset } from 'selectors/styles'
import { getStylesResultAsCss } from 'selectors/styles'
import css from 'css'

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

// const lafunc = (state) => {
// 	console.log('pasa por aca')
// 	const rulesArray = state.styles.rules
// 	const stylesArray = rulesArray.map(rule => {
// 	const formatted = {
// 		type: 'stylesheet',
// 		stylesheet: {
// 			rules: [rule]
// 		}
// 	}
// 	console.log(formatted)
// 	const stringified = css.stringify(formatted)
// 	console.log('stringified', stringified)
// 	const toReturn = `<style id="fdas">
// 		${stringified}
// 	</style>`
// 	console.log('toReturn', toReturn)
// 	return toReturn
// 	})
// }

const mapStateToProps = state => {
	const loaded = state.styles.ruleset.stylesheet ? true : false
	// const styles = lafunc(state)
	return { 
		loaded,
		platform: state.styles.platform,
		// styles: getStylesResultAsCss(state)
		// styles
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return { 
		kickFetchStyles: () => dispatch(fetchStyles(props.params.checksum))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditor)