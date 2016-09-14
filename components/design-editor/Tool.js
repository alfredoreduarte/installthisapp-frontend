import React, { PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'
import BackgroundSize from 'components/design-editor/BackgroundSize'
import TextAlign from 'components/design-editor/TextAlign'
import Slider from 'components/design-editor/Slider'
import ColorPicker from 'components/design-editor/ColorPicker'
import BackgroundRepeat from 'components/design-editor/BackgroundRepeat'
import TextStyles from 'components/design-editor/TextStyles'
import ImageUploader from 'components/design-editor/ImageUploader'

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
			case 'border-bottom-color':
			case 'border-left-color':
			case 'border-right-color':
			case 'border-top-color':
			case 'background-color':
			case 'background':
				return <ColorPicker property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'background':
			case 'background-image':
				return <ImageUploader property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'font-size':
				return <Slider property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'background-size':
				return <BackgroundSize property={property} onChange={val => handleChange(property, val)} value={value} />
				break
			case 'background-repeat':
				return <BackgroundRepeat onChange={val => handleChange(property, val)} value={value} />
				break
			case 'text-shadow':
			case 'padding':
			case 'position':
			case 'border':
			case 'margin-bottom':
			case 'line-height':
			case 'letter-spacing':
			case 'direction':
			case 'background-position':
			case 'background-attachment':
				return null
				break
			case 'texts':
				return <TextStyles onChange={(prop, val) => handleChange(prop, val)} value={value} />
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