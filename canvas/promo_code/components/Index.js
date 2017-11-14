import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/promo_code/components/FbPhoto'

const Index = ({ messages, images, settings, handleSubmit }) => (
	<div>
		{settings.showHeaderImageAtIndex && <Image source={images.header} />}
		<div className="container">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					id="indexTitle"
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.indexTitle}
				</h1>
				<p
					id="indexCopy"
					style={{
						marginBottom: '46px',
					}}>
					{messages.indexCopy}
				</p>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<Field
							className="form-control"
							name={'code'}
							id="codeField"
							required={true}
							component={'input'}
							placeholder={messages.codeFormLabel}
							type={'text'}
						/>
					</div>
					<div className="form-group">
						<button type="submit" id="codeFormButton" className="btn btn-primary btn-lg">
							{messages.codeFormButtonLabel}
						</button>
					</div>
				</form>
			</div>
		</div>
		<Image source={images.footer} />
		<Credits />
	</div>
)

Index.propTypes = {}

export default Index
