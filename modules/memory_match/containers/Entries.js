import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'
import { fetchEntities } from 'modules/memory_match/actions/entities'
import { deleteEntry, generateCsv } from 'modules/memory_match/actions/entries'
import EntriesView from 'modules/memory_match/components/Entries'

const Entries = props => <EntriesView {...props} />

const mapStateToProps = state => ({
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	generateCsv: () => dispatch(generateCsv()),
	fetchEntries: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteEntry(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)
