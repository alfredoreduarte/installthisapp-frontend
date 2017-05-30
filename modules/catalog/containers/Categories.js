import React from 'react'
import { connect } from 'react-redux'
import { getCurrentCategoriesByKeyword } from 'modules/catalog/selectors/categories'
import { fetchEntities } from 'modules/catalog/actions/entities'
import { deleteCategory } from 'modules/catalog/actions/categories'
import CategoriesView from 'modules/catalog/components/Categories'

const Categories = ({
	categories,
	handleDelete,
	selectedItems,
	fetchCategories,
	categoriesCreatePath,
	categoriesEditPath,
	showCreateModal,
	categoryToEdit,
	closeUrl,
}) => (
	<CategoriesView
		categories={categories}
		handleDelete={handleDelete}
		fetchCategories={fetchCategories}
		selectedItems={selectedItems}
		categoriesCreatePath={categoriesCreatePath}
		categoriesEditPath={categoriesEditPath}
		showCreateModal={showCreateModal}
		categoryToEdit={categoryToEdit}
		closeUrl={closeUrl}
	/>
)

const mapStateToProps = (state, props) => { 
	const categories = getCurrentCategoriesByKeyword(state, props)
	let categoryToEdit = null
	if (props.params.categoryId && categories.length > 0) {
		categoryToEdit = _.find(categories, {'id': parseInt(props.params.categoryId)})
	} 
	const createString = '/create'
	const editString = '/edit'
	const pathname = props.location.pathname
	const showModal = pathname.indexOf('/categories/create') !== -1 || pathname.indexOf('/categories/edit') !== -1
	return {
		categories,
		selectedItems: state.selectedItems,
		// 
		categoriesCreatePath: props.location.pathname + createString,
		categoriesEditPath: props.location.pathname + editString,
		showCreateModal: showModal,
		categoryToEdit,
		closeUrl: pathname.substring(0, pathname.length - createString.length),
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	fetchCategories: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteCategory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)