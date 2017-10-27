import React, { PropTypes } from 'react'

import Image from 'canvas/common-components/Image'

const Thanks = ({ messages, images, settings }) => (
	<div>
		{settings.showHeaderImageAtThankYou && <Image source={images.header} />}
		<div className="container">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.thankYouHeading}
				</h1>
				<p
					style={{
						marginBottom: '46px',
					}}>
					{messages.thankYouCopy}
				</p>
				<a href={settings.finishedUrl} target="_blank" rel="noopener" className="btn btn-primary btn-lg">
					{messages.finishButton}
				</a>
			</div>
		</div>
	</div>
)

Thanks.propTypes = {}

export default Thanks
