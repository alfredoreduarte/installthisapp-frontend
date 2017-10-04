import React from 'react'
import { connect } from 'react-redux'
import { getSchema } from 'modules/form/selectors/schema'
import { getFilteredEntries } from 'modules/form/selectors/entries'
import { fetchEntities } from 'modules/form/actions/entities'
import EntriesView from 'modules/form/components/Entries'

const Entries = props => <EntriesView {...props} />

const mapStateToProps = state => ({ 
	schema: getSchema(state),
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = dispatch => ({
	fetchEntries: () => dispatch(fetchEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)