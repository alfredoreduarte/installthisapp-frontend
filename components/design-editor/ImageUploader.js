import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FileInput from 'react-file-input'
import { saveImage } from 'actions/styles'
import { API_URL } from 'config'

const ImageUploader = ({
	clear,
	imgOrBackground,
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
			<a style={{marginLeft: '10px'}} href="javascript:void(0)" onClick={() => clear(imgOrBackground)}><small>(clear)</small></a>
		</div>
		<div className="ita-flex-box ita-flex-items-center ita-flex-justify-end ita-flex-block text-right">
			<FileInput 
				name="asset[attachment]"
				title={value}
				accept=".png,.gif,.jpg,.jpeg"
				placeholder="Upload Image"
				className="btn btn-sm btn-gray btn-outline"
				onChange={e => handleLocalChange(e, imgOrBackground)} />
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

const mapDispatchToProps = (dispatch, props) => ({
	handleLocalChange: (e, imgOrBackground) => {
		const input = e.target
		let formData = new FormData()
		formData.append(input.name, input.files[0])
		dispatch(saveImage(formData)).then(response => {
			if (imgOrBackground == 'img') {
				props.onChange(response.assetUrl)
			}
			else {
				props.onChange(`url(${response.assetUrl})`)
			}			
		})
	},
	clear: imgOrBackground => {
		if (imgOrBackground == 'img') {
			props.onChange(null)
		}
		else {
			props.onChange(`none`)
		}
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)