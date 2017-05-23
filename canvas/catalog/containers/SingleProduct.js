import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductByUrlSlug } from 'canvas/catalog/selectors/products'
import { getAllProducts } from 'canvas/catalog/selectors/products'
import { getAllCategories, getProductCategories } from 'canvas/catalog/selectors/categories'
import { getProductMedia } from 'canvas/catalog/selectors/media'
import { toggleContactModal } from 'canvas/catalog/actions/ui'
import SingleProductView from 'canvas/catalog/components/SingleProduct'

const SingleProduct = ({ 
	messages,
	images,
	productCategories,
	productMedia,
	permalink,
	productId,
	messageSent,
	title,
	description,
	price,
	categories,
	homeUrl,
	// 
	showContactModal,
	handleToggleContact,
	// 
	currency,
	relatedProducts,
}) => (
	<SingleProductView 
		headerImage={images.header} 
		footerImage={images.footer} 
		productCategories={productCategories}
		productMedia={productMedia}
		permalink={permalink}
		productId={productId}
		messageSent={messageSent}
		title={title}
		description={description}
		price={price}
		categories={categories}
		homeUrl={homeUrl}
		// 
		showContactModal={showContactModal}
		handleToggleContact={handleToggleContact}
		// 
		currency={currency}
		relatedProducts={relatedProducts}
	/>
)

const mapStateToProps = (state, props) => {
	const { id, price, permalink, name, description } = getProductByUrlSlug(state, props)
	const { currency } = state.settings
	return {
		images: {...state.images},
		productCategories: getProductCategories(state, props),
		productMedia: getProductMedia(state, props),
		currency: currency,
		permalink: permalink,
		productId: id,
		messageSent: state.ui.productRequestSent,
		title: name,
		description: description,
		price: price ? `${currency} ${price}` : null,
		categories: getAllCategories(state),
		homeUrl: `/${state.applicationData.canvasId}/${state.applicationData.checksum}`,
		showContactModal: state.ui.showContactModal,
		// related
		relatedProducts: _.take(getAllProducts(state), 3),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleContact: () => dispatch(toggleContactModal()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)