import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

const selector = formValueSelector('catalogCategoryCreator')

let CategoryCreator = ({ handleSubmit, fetching, change, categories }) => (
	<div>
		<div className="form-group">
			<label className="control-label">Name</label>
			<Field
				name={'name'}
				type="text" 
				className="form-control" 
				component="input"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Slug</label>
			<Field
				name={'slug'}
				type="text" 
				className="form-control" 
				component="input"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Parent</label>
			<Field name="parentId" component="select" className="form-control">
				<option></option>
				{categories.map(category => 
					<option key={category.id} value={category.id}>{category.name}</option>
				)}
			</Field>
		</div>
	</div>
)

CategoryCreator = reduxForm({
	form: 'catalogCategoryCreator',
})(CategoryCreator)

const mapStateToProps = (state, ownProps) => {
	let initialValues
	if (ownProps.initialCategory) {
		initialValues = ownProps.initialCategory
	}
	else {
		initialValues = {
			id: null,
			name: 'Category name',
		}
	}
	return {
		fetching: state.activityIndicators.updatingApp,
		initialValues,
	}
}

const mapDispatchToProps = dispatch => {
	return { 
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator)