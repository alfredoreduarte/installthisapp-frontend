import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Index from 'canvas/promo_code/components/Index'
import { claim } from 'canvas/promo_code/actions/claim'

let IndexContainer = props => <Index {...props} />

IndexContainer = reduxForm({
	form: 'entry', // a unique identifier for this form
})(IndexContainer)

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
})

const mapDispatchToProps = dispatch => ({
	handleSubmit: e => {
		e.preventDefault()
		console.log('submit!')
		dispatch(claim())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
