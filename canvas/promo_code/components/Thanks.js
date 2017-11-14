import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import FacebookProvider, { Login } from 'react-facebook'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/promo_code/components/FbPhoto'

const Thanks = ({ messages, images, settings, entriesCount }) => (
	<div>
		<Image source={images.header} />
		<div className="container">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					id="thanksTitle"
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.thanksTitle}
				</h1>
				<p
					id="thanksCopy"
					style={{
						marginBottom: '46px',
					}}>
					{messages.thanksCopy}
				</p>
				<p
					id="thanksCouponsAmountLabel"
					style={{
						marginBottom: '26px',
					}}>
					{messages.thanksCouponsAmountLabel}
				</p>
				<p
					id="entriesCount"
					style={{
						marginBottom: '46px',
					}}>
					{entriesCount}
				</p>
			</div>
		</div>
		<Image source={images.footer} />
		<Credits />
	</div>
)

Thanks.propTypes = {}

export default Thanks
