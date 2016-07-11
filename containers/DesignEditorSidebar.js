import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from 'containers/DesignEditorSidebarHeader'
import Tabs from 'containers/DesignEditorSidebarTabs'
import Tools from 'containers/DesignEditorTools'
import { getRulesetForCurrentSelector as getRuleset } from 'selectors/styles'

const DesignEditorSidebar = ({ selector, ruleset }) => (
	<div className="ita-side-bar">

		<Header
			handleClose={() => console.log('closing editor!')}
			handleSave={() => console.log('saving design!')}
			busy={true}
		/>	

		<Tabs
			handleTabs={tab => console.log('changed tab!', tab)}
		/>

		<Tools selector={selector} ruleset={ruleset} />
		
	</div>
)

const mapStateToProps = state => {
	const ruleset = getRuleset(state)
	return {
		ruleset
	}
}

export default connect(mapStateToProps)(DesignEditorSidebar)