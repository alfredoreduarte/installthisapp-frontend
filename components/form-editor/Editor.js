import React from 'react'
import { connect } from 'react-redux'

import NavBar from 'components/form-editor/NavBar'
import PreviewContainer from 'containers/form-editor/PreviewContainer'

const Editor = ({ handleSubmit, submitting, steps, stepsForms, setEditorStep, editorCurrentStep }) => (
  <div className="editor-main-wrapper">
    <NavBar />
    <div className="container">
      <div className="editor-container">
        <div className="editor-forms-column">
          <div className="editor-steps-list">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`editor-steps-list-item ${editorCurrentStep == index ? 'active' : ''}`}
                onClick={() => setEditorStep(index)}>
                {index + 1}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="editor-tabs-container">
            {stepsForms}
            <div className="editor-tabs-container-footer">
              {editorCurrentStep < steps.length - 1 && (
                <a href="javascript:void(0)" className="editor-next-tab-button" onClick={() => setEditorStep(editorCurrentStep + 1)}>
                  Next step
                </a>
              )}
              {editorCurrentStep == steps.length - 1 && (
                <button type="submit" disabled={submitting} className="editor-next-tab-button">
                  {submitting ? 'Saving, please wait...' : 'Save and Finish'}
                </button>
              )}
            </div>
          </form>
        </div>
        <PreviewContainer />
      </div>
    </div>
  </div>
)

export default Editor
