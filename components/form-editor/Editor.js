import React from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/form-editor/NavBar'
import WelcomeForm from 'components/form-editor/WelcomeForm'
import EntryForm from 'components/form-editor/EntryForm'
import LegalForm from 'components/form-editor/LegalForm'
import ThankYouForm from 'components/form-editor/ThankYouForm'
import PreviewContainer from 'containers/form-editor/PreviewContainer'

const Editor = ({ handleSubmit, submitting, steps, setEditorStep, editorCurrentStep }) => 
<div>
	<NavBar />
	<div className="container">
		<div className="editor-container">
			<div className="editor-forms-column">
				<div className="editor-steps-list">
					{steps.map((step, index) =>
						<div key={index} 
							className={`editor-steps-list-item ${editorCurrentStep == index ? 'active' : ''}`} 
							onClick={() => setEditorStep(index)}>
							{index + 1}
						</div>	
					)}
				</div>
				<form onSubmit={handleSubmit} className="editor-tabs-container">
					<WelcomeForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
					<EntryForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
					<LegalForm onTitleClick={() => setEditorStep(2)} active={editorCurrentStep == 2} />
					<ThankYouForm onTitleClick={() => setEditorStep(3)} active={editorCurrentStep == 3} />
					<div className="editor-tabs-container-footer">
						{editorCurrentStep < 3 && <a 
							href="javascript:void(0)" 
							className="editor-next-tab-button" onClick={() => setEditorStep(editorCurrentStep + 1)}>Next step</a>}
						{editorCurrentStep == 3 && <button
							type="submit" 
							disabled={submitting}
							className="editor-next-tab-button">{submitting ? 'Saving, please wait...' : 'Save and Finish'}</button>}
					</div>
				</form>
			</div>
			<PreviewContainer />
		</div>
	</div>
</div>

export default Editor