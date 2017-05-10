import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAllProducts } from 'canvas/catalog/selectors/products'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import Loading from 'canvas/catalog/components/Loading'
import IndexView from 'canvas/catalog/components/Index'

const Index = ({ 
	messages,
	images,
	products,
	categories,
}) => (
	<IndexView headerImage={images.header} footerImage={images.footer} products={products} categories={categories} />
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	products: getAllProducts(state),
	categories: getAllCategories(state),
})

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)