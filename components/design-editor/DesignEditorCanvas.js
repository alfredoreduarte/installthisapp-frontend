import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import css from 'css'
import Frame from 'react-frame-component'
import { searchText } from 'actions/filterText'
import DesignHelper from 'containers/design-helper/DesignHelper'
import { getStylesResultAsCss } from 'selectors/styles'

const DesignEditorCanvas = ({ platform, styles }) => (
	<div className="row">
		<div className={`ita-canvas ${platform}`}>
			<Frame 
				className="ita-canvas-frame"
				head={
					<link 
						type='text/css' 
						rel='stylesheet' 
						href='https://degleanuj61sc.cloudfront.net/application_assets/9S87FM/images/3_styles_original.css' />
				}>
				<div className="styles" dangerouslySetInnerHTML={{__html: styles}}></div>
				<DesignHelper />
			</Frame>
		</div>
	</div>
)

DesignEditorCanvas.propTypes = {
	platform: PropTypes.string.isRequired,
}

const processStyles = (state) => {
	const rulesArray = state.styles.rules
	const stylesArray = rulesArray.map(rule => {
		const formatted = {
			type: 'stylesheet',
			stylesheet: {
				rules: [rule]
			}
		}
		const stringified = css.stringify(formatted)
		const toReturn = `<style>${stringified}</style>`
		return toReturn
	})
	// console.log('toReturn', stylesArray)
	return stylesArray.join(' ')
}

const mapStateToProps = (state, props) => {
	let styles = processStyles(state)
	// let styles = getStylesResultAsCss(state)
	return {
		styles
	}
}
export default connect(mapStateToProps)(DesignEditorCanvas)