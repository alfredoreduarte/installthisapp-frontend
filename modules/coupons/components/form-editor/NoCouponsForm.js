import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let NoCouponsForm = ({ active, selectedValues, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		"No coupons available" screen
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Headline</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.noVouchersHeadline'} 
						component="input"
						type="text" 
						placeholder={'We are sorry'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Paragraph</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.noVouchersCopy'} 
						component="textarea"
						cols={5}
						placeholder={'There are no coupons available'} />
				</div>
			</div>
		</div>
	</div>
</div>

NoCouponsForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(NoCouponsForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		selectedValues: {
			welcomeLayout: selector(state, 'settings.welcomeLayout')
		},
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(NoCouponsForm)