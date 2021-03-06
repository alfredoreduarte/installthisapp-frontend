import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAllProducts } from 'canvas/catalog/selectors/products'
import { getAllCategories, getAllProductsByCategory, getCategoryByUrlSlug } from 'canvas/catalog/selectors/categories'
import { toggleProductListDisplayMode } from 'canvas/catalog/actions/ui'
import Loading from 'canvas/catalog/components/Loading'
import IndexView from 'canvas/catalog/components/Index'

const Index = ({ 
	messages,
	images,
	currency,
	products,
	productListDisplayMode,
	category,
	categories,
	homeUrl,
	toggleListGrid,
}) => (
	<IndexView 
		// 
		headerImage={images.header} 
		footerImage={images.footer} 
		logoDesktop={images.logoDesktop} 
		logoMobile={images.logoMobile} 
		// 
		footerCopy={messages.footerCopy}
		topBarCopy={messages.topBarCopy}
		homePageLabel={messages.homePage}
		categoriesListTitle={messages.categories}
		// 
		categories={categories} 
		homeUrl={homeUrl} 
		currency={currency} 
		// screen-specific
		productListDisplayMode={productListDisplayMode} 
		toggleListGrid={toggleListGrid}
		products={products} 
		category={category} 
	/>
)

const mapStateToProps = (state, props) => ({
	messages: {...state.messages},
	images: {...state.images},
	currency: state.settings.currency,
	products: props.params.categorySlug ? getAllProductsByCategory(state, props) : getAllProducts(state),
	homeUrl: `/catalog/${state.applicationData.checksum}`,
	productListDisplayMode: state.ui.productListDisplayMode,
	category: props.params.categorySlug ? getCategoryByUrlSlug(state, props) : null,
	categories: getAllCategories(state),
})

const mapDispatchToProps = dispatch => {
	return {
		toggleListGrid: () => dispatch(toggleProductListDisplayMode())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)