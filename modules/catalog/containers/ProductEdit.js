import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getFilteredProducts } from 'modules/catalog/selectors/products'
import { postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import { postNewCategoryWithReduxForm, deleteCategory } from 'modules/catalog/actions/categories'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'
import { getProductMedia, getFilteredMedia } from 'modules/catalog/selectors/media'
import { createMedium, deleteMedium } from 'modules/catalog/actions/media'
import { hideImagePicker, showImagePicker, showFeaturedImagePicker, hideFeaturedImagePicker } from 'modules/catalog/actions/ui'
import ProductForm from 'modules/catalog/components/ProductForm'

const ProductEdit = ({
	fetching,
	// 
	createMedium,
	handleClose,
	handleSubmit,
	product,
	// 
	media,
	// 
	showImagePicker,
	handleImagePickerHide,
	handleImagePickerShow,
	// 
	showFeaturedImagePicker,
	handleFeaturedImagePickerShow,
	handleFeaturedImagePickerHide,
	// categories
	categories,
	createCategory,
	handleCategoryDelete,
}) => (
	<ProductForm
		fetching={fetching}
		// 
		createMedium={createMedium}
		handleClose={handleClose}
		handleSubmit={handleSubmit}
		product={product}
		// 
		media={media}
		// 
		showImagePicker={showImagePicker}
		handleImagePickerHide={handleImagePickerHide}
		handleImagePickerShow={handleImagePickerShow}
		// 
		showFeaturedImagePicker={showFeaturedImagePicker}
		handleFeaturedImagePickerShow={handleFeaturedImagePickerShow}
		handleFeaturedImagePickerHide={handleFeaturedImagePickerHide}
		// categories
		categories={categories}
		createCategory={createCategory}
		handleCategoryDelete={handleCategoryDelete}
	/>
)

const mapStateToProps = (state, props) => {
	const products = getFilteredProducts(state, props)
	let product = null
	if (props.params.productId && products.length > 0) {
		product = _.find(products, {'id': parseInt(props.params.productId)})
	} 
	return {
		product,
		showFeaturedImagePicker: state.catalog.ui.showFeaturedImagePicker,
		showImagePicker: state.catalog.ui.showImagePicker,
		media: getFilteredMedia(state, props),
		fetching: state.activityIndicators.updatingApp,
		// categories
		categories: getFilteredCategories(state)
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const editString = '/edit/' + props.params.productId
	return {
		handleClose: () => browserHistory.push(props.location.pathname.substring(0, props.location.pathname.length - editString.length)),
		handleSubmit: () => dispatch(postNewProductWithReduxForm()),
		// media
		createMedium: (acceptedFiles, rejectedFiles) => dispatch(createMedium(acceptedFiles)),
		handleImagePickerHide: () => dispatch(hideImagePicker()),
		handleImagePickerShow: () => dispatch(showImagePicker()),
		// featured image
		handleFeaturedImagePickerShow: () => dispatch(showFeaturedImagePicker()),
		handleFeaturedImagePickerHide: () => dispatch(hideFeaturedImagePicker()),
		// categories
		createCategory: () => dispatch(postNewCategoryWithReduxForm()),
		handleCategoryDelete: id => dispatch(deleteCategory(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)