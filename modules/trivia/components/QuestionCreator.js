import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { updateAppSpecificSettings } from 'actions/apps'
import RenderOptions from 'modules/trivia/components/RenderOptions'
import { postNewQuestionWithReduxForm } from 'modules/trivia/actions/questions'

let QuestionCreator = ({ handleSubmit, fetching, onOptionRemove, change }) => (
	<div>
		<div className="form-group">
			<label className="control-label">Question</label>
			<Field
				name={'text'}
				type="text" 
				className="form-control" 
				component="input"
			/>
			<div className="form-group">
				<label>Options</label>
			</div>
			<FieldArray name="options" onOptionRemove={(field, name) => change(field, name)} component={RenderOptions} />
		</div>
	</div>
)

QuestionCreator = reduxForm({
	form: 'triviaQuestionCreator',
})(QuestionCreator)

const mapStateToProps = (state, ownProps) => {
	let initialValues
	if (ownProps.initialQuestion) {
		initialValues = ownProps.initialQuestion
	}
	else {
		initialValues = {
			id: null,
			text: 'Texto de la pregunta',
			options: [
				{
					id: null,
					text: 'Opción 1',
					correct: true,
					_destroy: false,
				}
			]
		}
	}
	return {
		fetching: state.activityIndicators.updatingApp,
		initialValues,
	}
}

const mapDispatchToProps = dispatch => {
	return { 
		onOptionRemove: () => {
			// e.preventDefault()
			// dispatch(postNewQuestionWithReduxForm())
			// dispatch(updateAppSpecificSettings())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreator)