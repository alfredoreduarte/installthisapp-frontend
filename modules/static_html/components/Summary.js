import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import MdEdit from 'react-icons/lib/md/edit'
import MdPerson from 'react-icons/lib/md/person'
import MdSettingsEthernet from 'react-icons/lib/md/settings-ethernet'
import User from 'components/User'

const Summary = ({ checksum, type, entries }) => (
	<div>
		<div className="col-md-4">
			<div className="panel panel-default text-center">
				<Link to={`/d/apps/${type}/${checksum}/editor`} className="panel-body">
					<MdEdit size={22} />
					Edit content
				</Link>
			</div>
		</div>
		<div className="col-md-4">
			<div className="panel panel-default text-center">
				<Link to={`/d/apps/${type}/${checksum}/integrations`} className="panel-body">
					<MdSettingsEthernet size={22} />
					Integrate with Facebook
				</Link>
			</div>
		</div>
	</div>
)

export default Summary