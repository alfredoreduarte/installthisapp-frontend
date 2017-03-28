import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'
import { fetchEntities } from 'modules/memory_match/actions/entities'
import { deleteEntry } from 'modules/memory_match/actions/entries'
import EntriesView from 'modules/memory_match/components/Entries'

const Entries = ({
	entries,
	selectedItems,
	fetchEntries,
	handleDelete,
}) => (
	<EntriesView
		entries={entries}
		fetchEntries={fetchEntries}
		handleDelete={handleDelete}
		selectedItems={selectedItems}
	/>
)

const mapStateToProps = state => ({ 
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchEntries: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteEntry(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)