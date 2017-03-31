import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'

const Summary = ({ checksum, type, entries, hasCards }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<p className="h6 text-uppercase"><b>Top 5 users</b></p>
		<div className="col-md-6">
		{entries.length == 0 ?
			<div className="ita-empty text-cente">
				<h5>
					No entries yet.
				</h5>
			</div>
		:
			<div>
			<Table className="ita-table">
				<tbody>
					{entries.map(entry => 
					<tr key={entry.user.identifier}>
						<td>
							<User name={entry.user.name} identifier={entry.user.identifier} small />
						</td>
						<td>
							<b>{entry.time} seconds</b>
						</td>
						<td>
							<b>{entry.clicks} clicks</b>
						</td>
					</tr>
					)}
				</tbody>
			</Table>
			<p><Link to={`/d/apps/${type}/${checksum}/scores`} className="btn btn-primary btn-sm" activeClassName="active">View full list</Link></p>
			</div>
		}
		</div>
		<div className="col-md-6">
			{!hasCards ? 
			<div className="alert alert-warning" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-info-sign"></span>{' '}
				You should add some cards for the game. <Link to={`/d/apps/${type}/${checksum}/cards`}>Start now</Link>.
			</div>
			:
			null
			}
		</div>
	</div>
)

export default Summary