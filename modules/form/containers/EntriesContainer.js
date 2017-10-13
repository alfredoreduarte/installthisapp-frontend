import React from 'react'
import { connect } from 'react-redux'
import { getSchema } from 'modules/form/selectors/schema'
import { getFilteredEntries, getWinnerEntry } from 'modules/form/selectors/entries'
import { fetchEntities } from 'modules/form/actions/entities'
import { toggleWinnerModal } from 'modules/form/actions/ui'
import EntriesView from 'modules/form/components/Entries'

const Entries = props => <EntriesView {...props} />

const mapStateToProps = (state, props) => ({ 
	schema: getSchema(state),
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
	winnerEntry: getWinnerEntry(state),
	showWinner: state.formModule.ui.winnerModalVisible,
})

const mapDispatchToProps = dispatch => ({
	fetchEntries: () => dispatch(fetchEntities()),
	toggleWinnerModal: () => dispatch(toggleWinnerModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)