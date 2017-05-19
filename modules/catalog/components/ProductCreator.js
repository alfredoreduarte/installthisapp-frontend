import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import RenderCategories from 'modules/catalog/components/RenderCategories'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'

const selector = formValueSelector('catalogProductCreator')

let ProductCreator = ({ fields, handleSubmit, fetching, change, allCategories }) => (
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
			<label className="control-label">Status</label>
			<Field name="status" component="select" className="form-control">
				<option></option>
				<option value="draft">Draft</option>
				<option value="published">Published</option>
				<option value="deleted">Deleted</option>
			</Field>
		</div>
		<div className="form-group">
			<label className="control-label">Featured</label>
			<Field
				name={'featured'}
				type="checkbox" 
				className="form-control" 
				component="input"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Description</label>
			<Field
				name={'description'}
				className="form-control" 
				component="textarea"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Short Description</label>
			<Field
				name={'shortDescription'}
				className="form-control" 
				component="textarea"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Price</label>
			<Field
				name={'price'}
				type="text" 
				className="form-control" 
				component="input"
			/>
		</div>
		<div className="form-group">
			<label className="control-label">Categories</label>
			<FieldArray 
				name="categoryIds"
				component={RenderCategories}
				categories={allCategories}
			/>
		</div>
	</div>
)

ProductCreator = reduxForm({
	form: 'catalogProductCreator',
})(ProductCreator)

const mapStateToProps = (state, ownProps) => {
	let initialValues
	if (ownProps.initialProduct) {
		initialValues = ownProps.initialProduct
	}
	else {
		initialValues = {
			id: null,
			name: 'Product name',
		}
	}
	return {
		fetching: state.activityIndicators.updatingApp,
		initialValues,
		allCategories: getFilteredCategories(state),
	}
}

const mapDispatchToProps = dispatch => {
	return { 
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreator)