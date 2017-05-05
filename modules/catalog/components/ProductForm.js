import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import RenderCategories from 'modules/catalog/components/RenderCategories'
import Medium from 'modules/catalog/components/Medium'
import MediaList from 'modules/catalog/components/MediaList'
import ImagePicker from 'modules/catalog/components/ImagePicker'
import SimpleImagePicker from 'modules/catalog/components/SimpleImagePicker'
import SimpleModal from 'modules/catalog/components/SimpleModal'

let ProductForm = ({ 
	fields,
	handleSubmit,
	handleClose,
	fetching,
	allCategories,
	featuredImage,
	galleryMedia,
	allMedia,
	media,
	createMedium,
	showImagePicker,
	handleImagePickerHide,
	handleImagePickerShow,
	showFeaturedImagePicker,
	handleFeaturedImagePickerHide,
	handleFeaturedImagePickerShow,
}) => (
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
				{featuredImage ?
					<div>
						<Field
							name={'featuredImageId'}
							media={allMedia}
							component={({ input: { value, onChange } }) => 
								<p className="text-right"><small><a href="javascript:void(0)" onClick={() => onChange(null)}>Remove Image</a></small></p>
							}
						/>
						<Medium
							attachmentUrl={featuredImage.attachmentUrl}
						/>
					</div>
				: 
					<div>
						<button className="btn btn-sm btn-primary btn-outline" onClick={() => handleFeaturedImagePickerShow()}>Add Image</button>
					</div>
				}
				<SimpleModal
					title={'Featured Image'}
					show={showFeaturedImagePicker}
					handleClose={handleFeaturedImagePickerHide}
				>
					<Field
						name={'featuredImageId'}
						media={allMedia}
						component={SimpleImagePicker}
					/>
				</SimpleModal>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Image Gallery</label>
				<div>
					<button className="btn btn-sm btn-primary btn-outline" onClick={() => handleImagePickerShow()}>Add image</button>
				</div>
				<SimpleModal
					title={'Product image gallery'}
					show={showImagePicker}
					handleClose={handleImagePickerHide}
				>
					<FieldArray
						name={'galleryMediaIds'}
						media={allMedia}
						component={ImagePicker}
					/>
				</SimpleModal>

				{galleryMedia.map(({ id, attachmentUrl, status }) => 
					<div key={id} className="col-md-6">
						<Medium
							attachmentUrl={attachmentUrl}
						/>
					</div>
				)}
			</div>
		</div>
	</div>
)

const reduxFormName = 'catalogProduct'

ProductForm = reduxForm({
	form: reduxFormName,
	enableReinitialize: true,
})(ProductForm)

const selector = formValueSelector(reduxFormName)

const mapStateToProps = (state, ownProps) => {
	const galleryMediaIds = selector(state, 'galleryMediaIds') ? selector(state, 'galleryMediaIds').map(mediaId => parseInt(mediaId)) : []
	return {
		featuredImage: _.find(ownProps.allMedia, {'id': selector(state, 'featuredImageId')}),
		galleryMedia: _.filter(ownProps.allMedia, medium => galleryMediaIds.indexOf(medium.id) >= 0),
		initialValues: ownProps.product,
	}
}

export default connect(mapStateToProps)(ProductForm)