import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductByUrlSlug } from 'canvas/catalog/selectors/products'
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
	const { price, permalink, name, description } = getProductByUrlSlug(state, props)
	const { currency } = state.settings
	return {
		images: {...state.images},
		productCategories: getProductCategories(state, props),
		productMedia: getProductMedia(state, props),
		currency: currency,
		permalink: permalink,
		title: name,
		description: description,
		price: `${currency} ${price}`,
		categories: getAllCategories(state),
		homeUrl: `/${state.applicationData.canvasId}/${state.applicationData.checksum}`,
		showContactModal: state.ui.showContactModal,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleContact: () => dispatch(toggleContactModal()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)