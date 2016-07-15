import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from 'containers/DesignEditorSidebarHeader'
import Tabs from 'containers/DesignEditorSidebarTabs'
import Tools from 'containers/DesignEditorTools'
import { modifyDesign } from 'actions/styles'
import { getRulesetForActiveSelector as getRuleset } from 'selectors/styles'

const DesignEditorSidebar = ({ ruleset, selector, handleChange }) => (
	<div className="ita-side-bar">

		<Header
			handleClose={() => console.log('closing editor!')}
			handleSave={() => console.log('saving design!')}
			busy={true}
		/>	

		<Tabs
			handleTabs={tab => console.log('changed tab!', tab)}
		/>

		<Tools ruleset={ruleset} handleChange={handleChange} selector={selector} />
		
	</div>
)

const mapStateToProps = state => {
	const ruleset = getRuleset(state)
	return {
		ruleset,
		selector: state.styles.activeSelector
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleChange: (selector, property, value) => dispatch(modifyDesign(selector, property, value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditorSidebar)