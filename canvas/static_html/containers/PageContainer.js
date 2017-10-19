import React from 'react'
import { connect } from 'react-redux'
import Page from 'canvas/static_html/components/Page'

const PageContainer = props => <Page {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)