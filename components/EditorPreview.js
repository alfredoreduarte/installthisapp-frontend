import React, { Component, PropTypes } from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FieldArray } from 'redux-form'
import { updateInfo } from 'actions/admin'
import FieldsDictionary from 'components/form-editor/FieldsDictionary'

const EditorPreview = ({ array, handleSubmit }) => 
<div className="editor-preview">
	<img src="/images/iphone6-portrait.png" />
</div>

export default EditorPreview