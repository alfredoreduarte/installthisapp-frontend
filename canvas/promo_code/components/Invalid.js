import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import FacebookProvider, { Login } from 'react-facebook'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/promo_code/components/FbPhoto'

const Invalid = ({ messages, images, settings }) => (
	<div>
		{settings.showHeaderImageAtInvalid && <Image source={images.header} />}
		<div className="container">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					id="invalidTitle"
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.invalidTitle}
				</h1>
				<p
					id="invalidCopy"
					style={{
						marginBottom: '46px',
					}}>
					{messages.invalidCopy}
				</p>
			</div>
		</div>
		<Image source={images.footer} />
		<Credits />
	</div>
)

Invalid.propTypes = {}

export default Invalid
