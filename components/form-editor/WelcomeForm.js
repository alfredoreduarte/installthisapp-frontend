import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let WelcomeForm = ({ active, selectedValues, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Welcome screen
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Layout</label>
				<div className="col-sm-10">
					<Field name="settings.welcomeLayout" component="select" className="form-control">
						<option value={'flyer'}>Flyer</option>
						<option value={'html'}>Images & Text</option>
					</Field>
				</div>
			</div>
			<hr />
			{selectedValues.welcomeLayout == 'flyer' &&
				<div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Flyer</label>
						<div className="col-sm-10">
							<Field name={'images.welcome'} recommendedDimensions="820x1000" component={ImageUploaderDropZone} />
							<p className="help-block">The image will act as a link to the next screen, so you might want to include a button in your design.</p>
						</div>
					</div>
				</div>
			}
			{selectedValues.welcomeLayout == 'html' &&
			<div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Header image</label>
					<div className="col-sm-10">
						<Field name={'images.header'} recommendedDimensions="820x250" component={ImageUploaderDropZone} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Headline</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.welcomeHeadline'} 
							component="input"
							type="text" 
							placeholder={'Welcome to our form'} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Paragraph</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.welcomeCopy'} 
							component="textarea"
							cols={5}
							placeholder={'Welcome to our form'} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Button</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.startButton'} 
							component="input"
							type="text" 
							placeholder={'Start now'} />
					</div>
				</div>
			</div>}
		</div>
	</div>
</div>

WelcomeForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(WelcomeForm)

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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeForm)