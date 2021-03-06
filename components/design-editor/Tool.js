import React, { PropTypes } from 'react'
import humps from 'humps'
import FontFamily from 'components/design-editor/FontFamily'
import TextOrientation from 'components/design-editor/TextOrientation'
import BackgroundSize from 'components/design-editor/BackgroundSize'
import BackgroundPosition from 'components/design-editor/BackgroundPosition'
import BackgroundAttachment from 'components/design-editor/BackgroundAttachment'
import TextAlign from 'components/design-editor/TextAlign'
import Slider from 'components/design-editor/Slider'
import ColorPicker from 'components/design-editor/ColorPicker'
import BackgroundRepeat from 'components/design-editor/BackgroundRepeat'
import TextStyles from 'components/design-editor/TextStyles'
import ImageUploader from 'components/design-editor/ImageUploader'

const Tool = ({ property, value, handleChange }) => (
	<div className="ita-sidebar-block">
		{(() => {
			switch (property) {
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
				case 'border-width':
				case 'font-size':
				case 'letter-spacing':
					return <Slider property={property} onChange={val => handleChange(property, val)} value={value} />
					break
				case 'background-size':
					return <BackgroundSize property={property} onChange={val => handleChange(property, val)} value={value} />
					break
				case 'background-position':
					return <BackgroundPosition property={property} onChange={val => handleChange(property, val)} value={value} />
					break
				case 'background-repeat':
					return <BackgroundRepeat onChange={val => handleChange(property, val)} value={value} />
					break
				case 'background-attachment':
					return <BackgroundAttachment onChange={val => handleChange(property, val)} value={value} />
					break
				case 'direction':
					return <TextOrientation onChange={val => handleChange(property, val)} value={value} />
					break
				case 'text-shadow':
				case 'padding':
				case 'position':
				case 'border':
				case 'border-style':
				case 'box-shadow':
				case 'margin-bottom':
				case 'line-height':
				case '-webkit-animation-duration':
				case 'animation-duration':
				case '-webkit-animation-fill-mode':
				case 'animation-fill-mode':
				case '-webkit-animation-name':
				case 'animation-name':
					return null
					break
				case 'texts':
					return <TextStyles onChange={(prop, val) => handleChange(prop, val)} value={value} />
				default:
					return (
						<div>
							<label>
								{_.capitalize(
									humps
										.decamelize(property)
										.split('-')
										.join(' ')
								)}
							</label>
							<input
								type="text"
								className="form-control"
								value={value}
								onChange={e => handleChange(property, e.target.value)}
							/>
						</div>
					)
			}
		})()}
	</div>
)

export default Tool
