import React from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'

let Legal = ({ active, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Legal Stuff
	</div>
	<div className="editor-tab-item-body">
		<div className="">
			<div className="form-group">
				<label className="control-label">Privacy Policy Link Text</label>
				<div className="">
					<Field 
						className="form-control"
						name={'messages.privacyPolicyLinkText'} 
						component="input"
						type="text" 
						placeholder={'Privacy Policy'} />
				</div>
			</div>
			<div className="form-group">
				<label className="control-label">Privacy Policy URL</label>
				<div className="">
					<Field 
						className="form-control"
						name={'settings.privacyPolicyUrl'} 
						component="input"
						type="text" 
						placeholder={'http://yourwebsite.com/privacy-policy.html'} />
				</div>
			</div>
		</div>
	</div>
</div>

Legal = reduxForm({
	form: APP_EDITOR_FORM_NAME,  // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(Legal)

// const selector = formValueSelector('APP_EDITOR_FORM_NAME')

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(Legal)