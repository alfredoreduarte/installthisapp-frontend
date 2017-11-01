import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import MdEdit from 'react-icons/lib/md/edit'
import MdPerson from 'react-icons/lib/md/person'
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official'
import SummarySquare from 'components/SummarySquare'

const Summary = ({ checksum, type, entries }) => (
	<div>
		<div className="col-md-4">
			<SummarySquare icon={<MdEdit size={42} />} link={`/d/apps/${type}/${checksum}/editor`} variant="one" label="Edit App" />
		</div>
		<div className="col-md-4">
			<SummarySquare
				icon={<MdPerson size={42} />}
				link={`/d/apps/${type}/${checksum}/entries`}
				variant="two"
				label={`View ${entries.length} entries`}
			/>
		</div>
		<div className="col-md-4">
			<SummarySquare
				icon={<FaFacebookOfficial size={42} />}
				link={`/d/apps/${type}/${checksum}/integrations/facebook`}
				variant="fb"
				label={`Integrate with Facebook`}
			/>
		</div>
	</div>
)

export default Summary
