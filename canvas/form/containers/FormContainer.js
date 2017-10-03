import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'canvas/form/selectors/entries'
import { getSchema } from 'canvas/form/selectors/entities'
import Form from 'canvas/form/components/Form'

let FormContainer = props => <Form {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	// entries: getFilteredEntries(state),
	schema: getSchema(state),
	fields: [
		// 
		// Steps for builder:
		// - Basic
		// 		- title
		// - Extra
		// - Feeds & OG contents
		// 
		// Fields for choosing at backend:
		// - short text
		// - first name
		// - last name
		// - email
		// - phone
		// - birth date
		// - gender
		// - country
		// - long text
		// - multiple choice
		// - check
		{
			"id": 231231,
			"component": "input",
			"type": "text",
			"label": "Nombre",
			"placeholder": "Nombre",
			"name": "name",
			"required": true,
		},
		{
			"id": 54322,
			"component": "input",
			"type": "text",
			"label": "Teléfono",
			"placeholder": "Teléfono",
			"name": "phone",
			"required": true,
		},
		{
			"id": 432432,
			"component": "input",
			"type": "email",
			"label": "Email",
			"placeholder": "Email",
			"name": "email",
			"required": true,
		},
		{
			"id": 543254342,
			"component": "radio",
			"label": "Color favorito",
			"name": "color",
			"required": true,
			"options": [
				"Rojo",
				"Verde",
				"Azul"
			]
		},
		{
			"id": 543243254342,
			"component": "radio",
			"label": "Género",
			"name": "gender",
			"required": true,
			"options": [
				"Masculino",
				"Femenino",
			]
		},
		{
			"id": 54322234,
			"component": "textarea",
			"label": "Comentario",
			"placeholder": "Comentario",
			"name": "comentario",
			"required": true,
		},
	]
})

FormContainer = reduxForm({
  form: 'simple'  // a unique identifier for this form
})(FormContainer)

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)