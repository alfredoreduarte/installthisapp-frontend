import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { submitForm } from 'canvas/form/actions/form'
import { getFilteredEntries } from 'canvas/form/selectors/entries'
import { getSchema } from 'canvas/form/selectors/entities'
import Form from 'canvas/form/components/Form'

let FormContainer = props => <Form {...props} />

FormContainer = reduxForm({
  form: 'entry'  // a unique identifier for this form
})(FormContainer)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	setttings: {...state.setttings},
	schema: getSchema(state),
})

const mapDispatchToProps = dispatch => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(submitForm())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)