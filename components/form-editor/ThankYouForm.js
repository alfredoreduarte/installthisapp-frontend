import React from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'

let ThankYouForm = ({ active, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		"Thank You" screen
	</div>
	<div className="editor-tab-item-body">
		<div className="">
			<div className="form-group">
				<label className="control-label">Heading</label>
				<div className="">
					<Field 
						className="form-control"
						name={'messages.thankYouHeading'} 
						component="input"
						type="text" 
						placeholder={'Thanks for submitting the form'} />
				</div>
			</div>
			<div className="form-group">
				<label className="control-label">Copy</label>
				<div className="">
					<Field 
						className="form-control"
						name={'messages.thankYouCopy'} 
						component="input"
						type="text" 
						placeholder={'We received your data and will contact you as soon as possible.'} />
				</div>
			</div>
			<div className="form-group">
				<label className="control-label">Button</label>
				<div className="">
					<Field 
						className="form-control"
						name={'messages.finishButton'} 
						component="input"
						type="text" 
						placeholder={'Visit our website'} />
				</div>
			</div>
			<div className="form-group">
				<label className="control-label">Website URL</label>
				<div className="">
					<Field 
						className="form-control"
						name={'settings.finishedUrl'} 
						component="input"
						type="text" 
						placeholder={'http://yourwebsite.com'} />
				</div>
			</div>
		</div>
	</div>
</div>

ThankYouForm = reduxForm({
	form: APP_EDITOR_FORM_NAME,              // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(ThankYouForm)

// const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouForm)