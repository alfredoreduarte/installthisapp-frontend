import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductByUrlSlug } from 'canvas/catalog/selectors/products'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import { toggleContactModal } from 'canvas/catalog/actions/ui'
import SingleProductView from 'canvas/catalog/components/SingleProduct'

const SingleProduct = ({ 
	messages,
	images,
	galleryImages,
	productCategories,
	productMedia,
	permalink,
	title,
	description,
	price,
	categories,
	homeUrl,
	// 
	showContactModal,
	handleToggleContact,
}) => (
	<SingleProductView 
		headerImage={images.header} 
		footerImage={images.footer} 
		galleryImages={galleryImages}
		productCategories={productCategories}
		productMedia={productMedia}
		permalink={permalink}
		title={title}
		description={description}
		price={price}
		categories={categories}
		homeUrl={homeUrl}
		// 
		showContactModal={showContactModal}
		handleToggleContact={handleToggleContact}
	/>
)

const mapStateToProps = (state, props) => {
	const product = getProductByUrlSlug(state, props)
	return {
		images: {...state.images},
		currency: state.settings.currency,
		galleryImages: [],
		productCategories: product.categories,
		productMedia: product.gallery.map(image => {
			const result = {
				...image, 
				original: image.attachmentUrl, 
				thumbnail: image.attachmentUrl
			}
			return result
		}),
		permalink: product.permalink,
		title: product.name,
		description: product.description,
		price: `${state.settings.currency} ${product.price}`,
		categories: getAllCategories(state),
		homeUrl: `/${state.applicationData.canvasId}/${state.applicationData.checksum}`,
		// linkUrl: `/${window.canvasId}/${window.checksum}/login`
		showContactModal: state.ui.showContactModal,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleContact: () => dispatch(toggleContactModal()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)