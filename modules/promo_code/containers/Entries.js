import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/promo_code/selectors/entries'
import { fetchEntities, generateCsv } from 'modules/promo_code/actions/entities'
import EntriesView from 'modules/promo_code/components/Entries'

const Entries = props => <EntriesView {...props} />

const mapStateToProps = state => ({
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	generateCsv: () => dispatch(generateCsv()),
	fetchEntries: () => dispatch(fetchEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)
