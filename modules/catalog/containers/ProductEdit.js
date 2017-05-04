import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getFilteredProducts } from 'modules/catalog/selectors/products'
import { postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'
import { getProductMedia, getFilteredMedia } from 'modules/catalog/selectors/media'
import { createMedium, deleteMedium } from 'modules/catalog/actions/media'
import { hideImagePicker, showImagePicker } from 'modules/catalog/actions/ui'
import ProductForm from 'modules/catalog/components/ProductForm'

const ProductEdit = ({
	createMedium,
	handleClose,
	handleSubmit,
	allCategories,
	product,
	featuredImage,
	media,
	showImagePicker,
	handleImagePickerHide,
	handleImagePickerShow,
}) => (
	<ProductForm
		createMedium={createMedium}
		handleClose={handleClose}
		handleSubmit={handleSubmit}
		allCategories={allCategories}
		product={product}
		featuredImage={featuredImage}
		media={media}
		showImagePicker={showImagePicker}
		handleImagePickerHide={handleImagePickerHide}
		handleImagePickerShow={handleImagePickerShow}
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
		showImagePicker: state.catalog.ui.showImagePicker,
		featuredImage: _.filter(getFilteredMedia(state), {'id': product.featuredImageId}),
		media: getProductMedia(state, props),
		fetching: state.activityIndicators.updatingApp,
		allCategories: getFilteredCategories(state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const editString = '/edit/' + props.params.productId
	return {
		handleClose: () => browserHistory.push(props.location.pathname.substring(0, props.location.pathname.length - editString.length)),
		handleSubmit: () => dispatch(postNewProductWithReduxForm()).then(() => browserHistory.push(props.location.pathname.substring(0, props.location.pathname.length - editString.length))),
		// media
		createMedium: (acceptedFiles, rejectedFiles) => dispatch(createMedium(acceptedFiles)),
		handleImagePickerHide: () => dispatch(hideImagePicker()),
		handleImagePickerShow: () => dispatch(showImagePicker()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)