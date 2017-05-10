import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAllProducts, getAllProductsByCategory } from 'canvas/catalog/selectors/products'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import Loading from 'canvas/catalog/components/Loading'
import IndexView from 'canvas/catalog/components/Index'

const Index = ({ 
	messages,
	images,
	currency,
	products,
	categories,
}) => (
	<IndexView headerImage={images.header} footerImage={images.footer} currency={currency} products={products} categories={categories} />
)

const mapStateToProps = (state, props) => ({
	messages: {...state.messages},
	images: {...state.images},
	currency: state.settings.currency,
	products: props.params.categorySlug ? getAllProductsByCategory(state, props) : getAllProducts(state),
	categories: getAllCategories(state),
})

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)