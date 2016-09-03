import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FileInput from 'react-file-input'
import { saveImage } from 'actions/styles'
import { API_URL } from 'config'

const ImageUploader = ({
	value,
	property,
	onChange,
	handleLocalChange,
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
				placeholder="Upload Image"
				className="btn btn-sm btn-gray btn-outline"
				onChange={handleLocalChange} />
		</div>
	</div>
)

ImageUploader.propTypes = {
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ 
	
})

const mapDispatchToProps = (dispatch, props) => ({
	handleLocalChange: (e) => {
		const input = e.target
		let formData = new FormData()
		formData.append(input.name, input.files[0])
		dispatch(saveImage(formData)).then(response => {
			props.onChange(`url(${response.assetUrl})`)
		})
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)