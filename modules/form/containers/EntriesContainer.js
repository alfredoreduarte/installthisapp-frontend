import React from 'react'
import { postToApi } from 'api'
import { connect } from 'react-redux'
import { generateCsv } from 'modules/form/actions'
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
	msg: () => {
		postToApi(`applications/RM9859/msg.json`)
	},
	generateCsv: () => dispatch(generateCsv()),
	fetchEntries: () => dispatch(fetchEntities()),
	toggleWinnerModal: () => dispatch(toggleWinnerModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)
