import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import RenderCategories from 'modules/catalog/components/RenderCategories'
import MediaList from 'modules/catalog/components/MediaList'
import ImagePicker from 'modules/catalog/components/ImagePicker'

const selector = formValueSelector('catalogProduct')

let ProductForm = ({ fields, handleSubmit, handleClose, fetching, allCategories, featuredImage, media, createMedium, showImagePicker, handleImagePickerHide, handleImagePickerShow }) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Create/Edit Product
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 text-right">
					<ButtonToolbar>
						<button className="btn btn-sm btn-outline btn-success pull-right" onClick={handleSubmit}>
							Save Product
						</button>
					</ButtonToolbar>
				</div>
			</div>
		</div>
		<div className="col-md-8">
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
				<label className="control-label">Short Description</label>
				<Field
					name={'shortDescription'}
					className="form-control" 
					component="textarea"
					rows={2}
				/>
			</div>
			<div className="form-group">
				<label className="control-label">Description</label>
				<Field
					name={'description'}
					className="form-control" 
					component="textarea"
					rows={5}
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
		</div>
		<div className="col-md-4">
			<div className="form-group">
				<label className="control-label">Status</label>
				<Field name="status" component="select" className="form-control">
					<option></option>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
					<option value="deleted">Deleted</option>
				</Field>
			</div>
			<hr />
			<div className="checkbox">
				<label>
					<Field
						name={'featured'}
						type="checkbox"
						component="input"
					/> Featured
				</label>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Categories</label>
				<FieldArray 
					name="categoryIds"
					component={RenderCategories}
					categories={allCategories}
				/>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Featured Image</label>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Image Gallery</label>
				<button className="btn btn-sm btn-primary btn-outline" onClick={() => handleImagePickerShow()}>Add image</button>
				<FieldArray 
					name="galleryMediaIds"
					component={ImagePicker}
					close={handleImagePickerHide}
					show={showImagePicker}
					createMedium={createMedium}
				/>
				<MediaList 
					media={media}
					handleDelete={() => console.log('delete')}
					onImageSelect={id => console.log(id)}
				 />
			</div>
		</div>
	</div>
)

ProductForm = reduxForm({
	form: 'catalogProduct',
})(ProductForm)

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: ownProps.product,
	}
}

export default connect(mapStateToProps)(ProductForm)