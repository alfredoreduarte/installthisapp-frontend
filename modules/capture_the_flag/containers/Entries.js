import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/capture_the_flag/selectors/entries'
import { fetchEntities } from 'modules/capture_the_flag/actions/entities'
import EntriesView from 'modules/capture_the_flag/components/Entries'

const Entries = ({ entries, selectedItems, fetchEntries }) => (
	<EntriesView entries={entries} fetchEntries={fetchEntries} selectedItems={selectedItems} />
)

const mapStateToProps = state => ({
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchEntries: () => dispatch(fetchEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)
