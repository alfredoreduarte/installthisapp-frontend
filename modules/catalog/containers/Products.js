import React from 'react'
import { connect } from 'react-redux'
import { getCurrentProductsByKeyword } from 'modules/catalog/selectors/products'
import { fetchEntities } from 'modules/catalog/actions/entities'
import { deleteProduct } from 'modules/catalog/actions/products'
import ProductsView from 'modules/catalog/components/Products'

const Products = ({
	products,
	handleDelete,
	selectedItems,
	fetchProducts,
	productsCreatePath,
	productsEditPath,
	showCreateModal,
	productToEdit,
	closeUrl,
}) => (
	<ProductsView
		products={products}
		handleDelete={handleDelete}
		fetchProducts={fetchProducts}
		selectedItems={selectedItems}
		productsCreatePath={productsCreatePath}
		productsEditPath={productsEditPath}
		showCreateModal={showCreateModal}
		productToEdit={productToEdit}
		closeUrl={closeUrl}
	/>
)

const mapStateToProps = (state, props) => { 
	const products = getCurrentProductsByKeyword(state, props)
	let productToEdit = null
	if (props.params.productId && products.length > 0) {
		productToEdit = _.find(products, {'id': parseInt(props.params.productId)})
	} 
	const createString = '/create'
	const editString = '/edit'
	const pathname = props.location.pathname
	const showModal = pathname.indexOf('/products/create') !== -1 || pathname.indexOf('/products/edit') !== -1
	return {
		products,
		selectedItems: state.selectedItems,
		// 
		productsCreatePath: props.location.pathname + createString,
		productsEditPath: props.location.pathname + editString,
		showCreateModal: showModal,
		productToEdit,
		closeUrl: pathname.substring(0, pathname.length - createString.length),
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	// handleSelect: id => dispatch(selectItemOnTable(id)),
	fetchProducts: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteProduct(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)