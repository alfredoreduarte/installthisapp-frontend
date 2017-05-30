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
import MediaUploader from 'modules/catalog/components/MediaUploader'

let ProductForm = ({ 
	fetching,
	fields,
	handleSubmit,
	handleClose,
	featuredImage,
	galleryMedia,
	galleryMediaIds,
	media,
	deleteMedium,
	showImagePicker,
	handleImagePickerHide,
	handleImagePickerShow,
	showFeaturedImagePicker,
	handleFeaturedImagePickerHide,
	handleFeaturedImagePickerShow,
	// categories
	categories,
	categoryIds,
	createCategory,
	handleCategoryDelete,
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
						<button className="btn btn-sm btn-outline btn-success pull-right" disabled={fetching} onClick={handleSubmit}>
							{fetching ? 'Saving...' : 'Save Product'}
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
					categories={categories}
					categoryIds={categoryIds}
				/>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Featured Image</label>
				{featuredImage ?
					<div>
						<Field
							name={'featuredImageId'}
							media={media}
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
						<p className="text-right"><small><a href="javascript:void(0)" onClick={handleFeaturedImagePickerShow}>Add image</a></small></p>
					</div>
				}
				<SimpleModal
					title={'Featured Image'}
					show={showFeaturedImagePicker}
					handleClose={handleFeaturedImagePickerHide}
					bsSize="large"
				>
					<div style={{marginBottom: '20px'}}><MediaUploader /></div>
					<div style={{
						width: '100%',
						height: '400px',
						height: '50vh',
						overflowY: 'auto',
						marginBottom: '20px',
					}}>
						<Field
							name={'featuredImageId'}
							media={media}
							onDelete={deleteMedium}
							component={SimpleImagePicker}
						/>
					</div>
					<div className="text-center">
						<button className="btn btn-success btn-lg" onClick={handleFeaturedImagePickerHide}>Done</button>
					</div>
				</SimpleModal>
			</div>
			<hr />
			<div className="form-group">
				<label className="control-label">Image Gallery</label>
				<p className="text-right">
					<small>
						<a href="javascript:void(0)" onClick={() => handleImagePickerShow()}>Add/remove images</a>
					</small>
				</p>
				<SimpleModal
					title={'Product image gallery'}
					show={showImagePicker}
					handleClose={handleImagePickerHide}
					bsSize="large"
				>
					<div style={{marginBottom: '20px'}}><MediaUploader /></div>
					<div style={{
						width: '100%',
						height: '400px',
						height: '50vh',
						overflowY: 'auto',
						marginBottom: '20px',
					}}>
						<FieldArray
							name={'galleryMediaIds'}
							media={media}
							onDelete={deleteMedium}
							galleryMediaIds={galleryMediaIds}
							component={ImagePicker}
						/>
					</div>
					<div className="text-center">
						<button className="btn btn-success btn-lg" onClick={handleImagePickerHide}>Done</button>
					</div>
				</SimpleModal>

				<FieldArray
					name={'galleryMediaIds'}
					galleryMedia={galleryMedia}
					galleryMediaIds={galleryMediaIds}
					component={({ galleryMediaIds, galleryMedia, fields }) => 
						<div>
						{galleryMedia.map(({ id, attachmentUrl, status }) => 
							<div key={id} className="col-md-6">
								<Medium
									attachmentUrl={attachmentUrl}
									handleDelete={() => fields.remove(galleryMediaIds.indexOf(id))}
								/>
							</div>
						)}
						</div>
					}
				/>
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
	const categoryIds = selector(state, 'categoryIds') ? selector(state, 'categoryIds').map(categoryId => parseInt(categoryId)) : []
	return {
		featuredImage: _.find(ownProps.media, {'id': selector(state, 'featuredImageId')}),
		galleryMedia: _.filter(ownProps.media, medium => galleryMediaIds.indexOf(medium.id) >= 0),
		galleryMediaIds: selector(state, 'galleryMediaIds') ? selector(state, 'galleryMediaIds').map(galleryMediaId => parseInt(galleryMediaId)) : [],
		categoryIds: selector(state, 'categoryIds') ? selector(state, 'categoryIds').map(categoryId => parseInt(categoryId)) : [],
		initialValues: ownProps.product,
	}
}

export default connect(mapStateToProps)(ProductForm)