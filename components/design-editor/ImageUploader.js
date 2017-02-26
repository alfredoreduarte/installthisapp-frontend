import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FileInput from 'react-file-input'
import { toggleActivitySavingDesign } from 'actions/activityIndicators'
import { getSignedRequest } from 'actions/styles'
import { API_URL } from 'config'

const ImageUploader = ({
	clear,
	value,
	property,
	onChange,
	handleChange,
}) => (
	<div className="ita-flex-box ita-flex-box-horizontal">
		<div className="ita-flex-box ita-flex-items-center ita-flex-shrink">
			<label>
				{_.capitalize(_.replace(property, '-', ' '))}
			</label>
		</div>
		<div className="ita-flex-box ita-flex-items-center ita-flex-justify-end ita-flex-block text-right">
			<FileInput 
				name="asset[attachment]"
				title={value}
				accept=".png,.gif,.jpg,.jpeg"
				placeholder="Upload"
				className="btn btn-sm btn-gray btn-outline"
				onChange={handleChange} />
			<button className="btn btn-danger btn-sm btn-outline" style={{marginLeft: '10px'}} onClick={clear}>
				<span className="glyphicon glyphicon-trash"></span>
			</button>
		</div>
	</div>
)

ImageUploader.propTypes = {
	value: PropTypes.string,
	property: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ 
	
})

const mapDispatchToProps = (dispatch, props) => {
	const imgOrBackground = props.imgOrBackground
	return {
		handleChange: e => {
			dispatch(toggleActivitySavingDesign())
			const input = e.target
			const file = input.files[0]
			if (file == null) {return false}
			dispatch(getSignedRequest(file)).then(response => {
				dispatch(toggleActivitySavingDesign())
				if (imgOrBackground == 'img') {
					props.onChange(response)
				}
				else {
					props.onChange(`url(${response})`)
				}	
			})
		},
		clear: () => {
			if (imgOrBackground == 'img') {
				props.onChange(null)
			}
			else {
				props.onChange(`none`)
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)