import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// 
import { saveForm } from 'modules/form/actions'
import { getSchema } from 'modules/form/selectors/schema'
import Editor from 'components/Editor'

let EditorContainer = props => <Editor {...props} />

EditorContainer = reduxForm({
	form: 'formEditor',
})(EditorContainer)

// const selector = formValueSelector('formEditor')

const mapStateToProps = (state, props) => {
	return {
		initialValues: {
			messages: {...state.styles.messages},
			schema: getSchema(state),
		},
		// schemaFieldsForTypeConditions: selector(state, 'FieldsDictionary'),
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(saveForm())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)