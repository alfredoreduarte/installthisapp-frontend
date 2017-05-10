import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAllProducts, getAllProductsByCategory } from 'canvas/catalog/selectors/products'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import { toggleProductListDisplayMode } from 'canvas/catalog/actions/ui'
import Loading from 'canvas/catalog/components/Loading'
import IndexView from 'canvas/catalog/components/Index'

const Index = ({ 
	messages,
	images,
	currency,
	products,
	productListDisplayMode,
	categories,
	homeUrl,
	toggleListGrid,
}) => (
	<IndexView 
		headerImage={images.header} 
		footerImage={images.footer} 
		currency={currency} 
		products={products} 
		productListDisplayMode={productListDisplayMode} 
		categories={categories} 
		homeUrl={homeUrl} 
		toggleListGrid={toggleListGrid}
	/>
)

const mapStateToProps = (state, props) => ({
	messages: {...state.messages},
	images: {...state.images},
	currency: state.settings.currency,
	products: props.params.categorySlug ? getAllProductsByCategory(state, props) : getAllProducts(state),
	homeUrl: `/${state.applicationData.canvasId}/${state.applicationData.checksum}`,
	productListDisplayMode: state.ui.productListDisplayMode,
	categories: getAllCategories(state),
})

const mapDispatchToProps = dispatch => {
	return {
		toggleListGrid: () => dispatch(toggleProductListDisplayMode())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)