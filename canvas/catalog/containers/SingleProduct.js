import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductByUrlSlug } from 'canvas/catalog/selectors/products'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import SingleProductView from 'canvas/catalog/components/SingleProduct'

const SingleProduct = ({ 
	messages,
	images,
	galleryImages,
	productCategories,
	productMedia,
	title,
	description,
	price,
	categories,
}) => (
	<SingleProductView 
		headerImage={images.header} 
		footerImage={images.footer} 
		galleryImages={galleryImages}
		productCategories={productCategories}
		productMedia={productMedia}
		title={title}
		description={description}
		price={price}
		categories={categories}
	/>
)

const mapStateToProps = (state, props) => {
	const product = getProductByUrlSlug(state, props)
	return {
		images: {...state.images},
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
		title: product.name,
		description: product.description,
		price: product.price,
		categories: getAllCategories(state),
		// linkUrl: `/${window.canvasId}/${window.checksum}/login`
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)