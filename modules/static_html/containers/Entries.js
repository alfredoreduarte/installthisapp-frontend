import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/static_html/selectors/entries'
import { fetchEntities } from 'modules/static_html/actions/entities'
import EntriesView from 'modules/static_html/components/Entries'

const Entries = ({
	entries,
	selectedItems,
	fetchEntries
}) => (
	<EntriesView
		entries={entries}
		fetchEntries={fetchEntries}
		selectedItems={selectedItems}
	/>
)

const mapStateToProps = state => ({ 
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchEntries: () => dispatch(fetchEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)