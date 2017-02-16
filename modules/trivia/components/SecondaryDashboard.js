import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
import { getEntries } from 'modules/trivia/selectors/answers'

const SecondaryDashboard = ({ checksum, type, entries }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<p className="h6 text-uppercase"><b>Top 5 users</b></p>
		{entries.length == 0 ?
			<div className="ita-empty text-cente">
				<h5>
					Nobody has answered any questions yet.
				</h5>
			</div>
		:
			<div className="col-md-6">
				<Table className="ita-table">
					<tbody>
						{entries.map(entry => 
						<tr key={entry.senderId}>
							<td>
								<User 
									name={entry.senderName} 
									identifier={entry.senderId} 
									small
									 />
							</td>
							<td>
								<b>{entry.score}</b>
							</td>
						</tr>
						)}
					</tbody>
				</Table>
				<p><Link to={`/d/apps/${type}/${checksum}/scoreboard`} className="btn btn-primary btn-sm" activeClassName="active">View full list</Link></p>
			</div>
		}
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: []
		// entries: getEntries(state).slice(0,5),
	}
}

export default connect(mapStateToProps)(SecondaryDashboard)