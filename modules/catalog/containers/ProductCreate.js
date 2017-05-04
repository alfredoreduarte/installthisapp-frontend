import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { postNewProductWithReduxForm } from 'modules/catalog/actions/products'
import { getFilteredCategories } from 'modules/catalog/selectors/categories'
import { getFilteredMedia } from 'modules/catalog/selectors/media'
import ProductForm from 'modules/catalog/components/ProductForm'

const ProductCreate = ({
	handleClose,
	handleSubmit,
	allCategories,
	media,
}) => (
	<ProductForm
		handleClose={handleClose}
		handleSubmit={handleSubmit}
		allCategories={allCategories}
		media={media}
	/>
)

const mapStateToProps = (state, props) => {
	return {
		media: getFilteredMedia(state),
		fetching: state.activityIndicators.updatingApp,
		allCategories: getFilteredCategories(state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const createString = '/create'
	const pathname = props.location.pathname
	return {
		handleClose: () => browserHistory.push(pathname.substring(0, pathname.length - createString.length)),
		handleSubmit: () => dispatch(postNewProductWithReduxForm()).then(() => browserHistory.push(pathname.substring(0, pathname.length - createString.length))),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)