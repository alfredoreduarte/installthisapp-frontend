import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAllCategories } from 'canvas/catalog/selectors/categories'
import CategoriesView from 'canvas/catalog/components/Categories'

const Categories = ({ 
	messages,
	images,
	categories,
}) => (
	<CategoriesView headerImage={images.header} footerImage={images.footer} categories={categories} />
)

const mapStateToProps = (state, props) => ({
	messages: {...state.messages},
	images: {...state.images},
	categories: getAllCategories(state),
})

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)