import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FileInput from 'react-file-input'
import { getSignedRequest } from 'actions/styles'
import { API_URL } from 'config'

const ImageUploader = ({
	clear,
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
			<a style={{marginLeft: '10px'}} href="javascript:void(0)" onClick={() => clear()}><small>(clear)</small></a>
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
	value: PropTypes.string,
	property: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ 
	
})

const mapDispatchToProps = (dispatch, props) => {
	const imgOrBackground = props.imgOrBackground
	return {
		// handleLocalChange: (e, imgOrBackground) => {
		// 	const input = e.target
		// 	let formData = new FormData()
		// 	formData.append(input.name, input.files[0])
		// 	dispatch(saveImage(formData)).then(response => {
		// 		if (imgOrBackground == 'img') {
		// 			props.onChange(response.assetUrl)
		// 		}
		// 		else {
		// 			props.onChange(`url(${response.assetUrl})`)
		// 		}			
		// 	})
		// },
		handleLocalChange: e => {
			const input = e.target
			const file = input.files[0]
			if (file == null) {
				return false
			}
			dispatch(getSignedRequest(file)).then(response => {
				console.log('done!!', response)
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