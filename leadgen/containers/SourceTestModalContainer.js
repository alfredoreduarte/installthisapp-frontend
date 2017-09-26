import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import SourceTestModal from 'leadgen/components/SourceTestModal'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { 
	showDestinationsForm, 
	setDefaultLeadFormForDestinationCreation,
	resetTestLead,
} from 'leadgen/actions/ui'
import { sendTestLead, getTestLead, stopPollTestArrival } from 'leadgen/actions/fbLeadforms'

const SourceTestModalContainer = props => <SourceTestModal {...props} />

export default connect((state) => {
	const sourceForTesting = _.find(getLeadformsWithPages(state), {'id': state.leadgenUI.testingSourceWithId})
	return {
		sourceForTesting,
		testStatus: state.leadgenUI.testLead,
		testLeadData: state.leadgenUI.sourceTestLeadData,
		fbPageIdentifier: sourceForTesting ? sourceForTesting.fbPageIdentifier : null,
		show: state.leadgenUI.testingSourceWithId ? true : false,
	}
}, (dispatch) => {
	return {
		handleHide: () => {
			dispatch(stopPollTestArrival())
			dispatch(resetTestLead())
		},
		handleSendTest: id => dispatch( sendTestLead(id, false) ),
		showDestinationFormForSourceWithId: id => {
			dispatch( resetTestLead() )
			dispatch( setDefaultLeadFormForDestinationCreation(id) )
			dispatch( getTestLead(id) ).then( () => dispatch( showDestinationsForm() ) )
		},
	}
})(SourceTestModalContainer)