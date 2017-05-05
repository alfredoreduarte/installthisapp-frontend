import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'
import { getFilteredMedia } from 'modules/catalog/selectors/media'
import { hideImagePicker, showImagePicker, showFeaturedImagePicker, hideFeaturedImagePicker } from 'modules/catalog/actions/ui'
import ProductForm from 'modules/catalog/components/ProductForm'

const ProductCreate = ({
	handleClose,
	handleSubmit,
	allCategories,
	// 
	allMedia,
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
		allCategories={allCategories}
		// 
		allMedia={allMedia}
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
		allMedia: getFilteredMedia(state, props),
		media: [],
		fetching: state.activityIndicators.updatingApp,
		allCategories: getFilteredCategories(state),
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
		handleImagePickerHide: () => dispatch(hideImagePicker()),
		handleImagePickerShow: () => dispatch(showImagePicker()),
		// featured image
		handleFeaturedImagePickerShow: () => dispatch(showFeaturedImagePicker()),
		handleFeaturedImagePickerHide: () => dispatch(hideFeaturedImagePicker()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)