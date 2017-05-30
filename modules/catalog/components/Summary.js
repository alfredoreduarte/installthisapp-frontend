import React from 'react'
import { connect } from 'react-redux'
import pluralize from 'pluralize'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'

const Summary = ({ checksum, type, entries, hasProducts }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<p className="h6 text-uppercase"><b>Most demanded products</b></p>
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
					<tr key={entry.id}>
						<td>
							{entry.name}
						</td>
						<td>
							<b>{entry.messagesCount} {pluralize('message', entry.messagesCount)}</b>
						</td>
					</tr>
					)}
				</tbody>
			</Table>
			<p><Link to={`/d/apps/${type}/${checksum}/products`} className="btn btn-primary btn-sm" activeClassName="active">View full list</Link></p>
			</div>
		}
		</div>
		<div className="col-md-6">
			{!hasProducts ? 
			<div className="alert alert-danger" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-info-sign"></span>{' '}
				You should create some products! <Link to={`/d/apps/${type}/${checksum}/products`}>Start now</Link>.
			</div>
			:
			null
			}
		</div>
	</div>
)

export default Summary