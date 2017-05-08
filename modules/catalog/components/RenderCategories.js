import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field } from 'redux-form'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

const RenderCategories = ({ categories, categoryIds, fields, meta: { touched, error } }) => (
	<div>
		{categories.map(category => 
			<div className="checkbox" key={category.id}>
				<label>
					<input 
						checked={categoryIds.indexOf(category.id) !== -1}
						onChange={e => {
							if(e.target.checked) {
								fields.push(category.id)
							} else {
								fields.remove(categoryIds.indexOf(category.id))
							}
						}}
						type="checkbox" /> {category.name}
				</label>
			</div>
		)}
	</div>
)

export default RenderCategories