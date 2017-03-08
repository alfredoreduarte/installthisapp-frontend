import React, { PropTypes } from 'react'
import FbPhoto from 'components/FbPhoto'

const User = ({ name, identifier }) => (
	<div className={`media`} style={{marginBottom: '20px'}}>
		<div className="media-left media-middle">
			<FbPhoto className="media-object img-circle" width={50} identifier={identifier} />
		</div>
		<div className="media-body media-middle">
			<h4 className={`media-heading`}>
				<span className="ita-cali-uploading-user-name">{name}</span>
			</h4>
		</div>
	</div>
)

User.propTypes = {
	name: PropTypes.string.isRequired,
	identifier: PropTypes.string.isRequired,
}

export default User