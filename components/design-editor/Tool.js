import React, { PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'
import TextAlign from 'components/design-editor/TextAlign'
import Slider from 'components/design-editor/Slider'
import ColorPicker from 'components/design-editor/ColorPicker'

const Tool = ({ property, value, handleChange }) => (
	<div className="ita-sidebar-block">
	{(() => {
		switch(property){
			case 'font-family':
				return <FontFamily onChange={val => handleChange(property, val)} value={value} />
				break
			case 'text-align':
				return <TextAlign onChange={val => handleChange(property, val)} value={value} />
				break
			case 'color':
			case 'border-color':
			case 'background-color':
				return <ColorPicker property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'font-size':
			case 'line-height':
			case 'letter-spacing':
				return <Slider property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'text-shadow':
			case 'padding':
			case 'position':
			case 'border':
			case 'margin-bottom':
				return null
				break
			case 'font-weight':
				return <div class="checkbox">
					<label>
						<input 
							type="checkbox" 
							defaultChecked={value == 'bold'} 
							onChange={e => handleChange(property, e.target.checked ? 'bold' : 'inherit')} />
						{' '}Bold
					</label>
				</div>
			case 'font-style':
				return <div class="checkbox">
					<label>
						<input 
							type="checkbox" 
							defaultChecked={value == 'italic'} 
							onChange={e => handleChange(property, e.target.checked ? 'italic' : 'inherit')} />
						{' '}Italics
					</label>
				</div>
			case 'text-decoration':
				return <div class="checkbox">
					<label>
						<input 
							type="checkbox" 
							defaultChecked={value == 'underline'} 
							onChange={e => handleChange(property, e.target.checked ? 'underline' : 'inherit')} />
						{' '}Underline
					</label>
				</div>
			case 'text-transform':
				return <div class="checkbox">
					<label>
						<input 
							type="checkbox" 
							defaultChecked={value == 'uppercase'} 
							onChange={e => handleChange(property, e.target.checked ? 'uppercase' : 'inherit')} />
						{' '}All-caps
					</label>
				</div>
			default:
				return <div>
					<label>{property}</label>
					<input 
						type="text" 
						className="form-control"
						value={value} 
						onChange={e => handleChange(property, e.target.value)} />
				</div>
		}
	})()}
	</div>
)

export default Tool