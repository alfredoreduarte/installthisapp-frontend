import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// 
import { saveForm } from 'modules/form/actions'
import { getSchema } from 'modules/form/selectors/schema'
import EditorPreview from 'components/EditorPreview'

const EditorPreviewContainer = props => <EditorPreview {...props} />

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPreviewContainer)