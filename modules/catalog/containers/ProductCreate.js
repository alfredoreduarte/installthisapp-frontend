import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { createMedium, deleteMedium } from 'modules/catalog/actions/media'
import { postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'
import { getFilteredMedia } from 'modules/catalog/selectors/media'
import { hideImagePicker, showImagePicker, showFeaturedImagePicker, hideFeaturedImagePicker } from 'modules/catalog/actions/ui'
import ProductForm from 'modules/catalog/components/ProductForm'

const ProductCreate = ({
	handleClose,
	handleSubmit,
	categories,
	// 
	createMedium, 
	deleteMedium,
	media,
	// 
	showImagePicker,
	handleImagePickerHide,
	handleImagePickerShow,
	// 
	showFeaturedImagePicker,
	handleFeaturedImagePickerShow,
	handleFeaturedImagePickerHide,
}) => (
	<ProductForm
		handleClose={handleClose}
		handleSubmit={handleSubmit}
		categories={categories}
		// 
		createMedium={createMedium}
		deleteMedium={deleteMedium}
		media={media}
		// 
		showImagePicker={showImagePicker}
		handleImagePickerHide={handleImagePickerHide}
		handleImagePickerShow={handleImagePickerShow}
		// 
		showFeaturedImagePicker={showFeaturedImagePicker}
		handleFeaturedImagePickerShow={handleFeaturedImagePickerShow}
		handleFeaturedImagePickerHide={handleFeaturedImagePickerHide}
	/>
)

const mapStateToProps = (state, props) => {
	return {
		media: getFilteredMedia(state, props),
		fetching: state.activityIndicators.updatingApp,
		categories: getFilteredCategories(state),
		//
		showFeaturedImagePicker: state.catalog.ui.showFeaturedImagePicker,
		showImagePicker: state.catalog.ui.showImagePicker,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const createString = '/create'
	const pathname = props.location.pathname
	return {
		handleClose: () => browserHistory.push(pathname.substring(0, pathname.length - createString.length)),
		handleSubmit: () => dispatch(postNewProductWithReduxForm()).then(() => browserHistory.push(pathname.substring(0, pathname.length - createString.length))),
		// media
		createMedium: (acceptedFiles, rejectedFiles) => dispatch(createMedium(acceptedFiles)),
		deleteMedium: id => dispatch(deleteMedium(id)),
		handleImagePickerHide: () => dispatch(hideImagePicker()),
		handleImagePickerShow: () => dispatch(showImagePicker()),
		// featured image
		handleFeaturedImagePickerShow: () => dispatch(showFeaturedImagePicker()),
		handleFeaturedImagePickerHide: () => dispatch(hideFeaturedImagePicker()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)