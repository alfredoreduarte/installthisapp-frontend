import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field } from 'redux-form'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

const RenderCategories = ({ fields, meta: { touched, error }, categories }) => (
	<div>
		{categories.map(category => 
			<div className="checkbox" key={category.id}>
				<label>
					<input 
						checked={() => {
							var coso = fields.map(field => field)
							return coso.includes(category.id)
						}}
						onChange={e => {
							fields.push(category.id)
						}}
						type="checkbox" /> {category.name}
				</label>
			</div>
		)}
	</div>
)

export default RenderCategories