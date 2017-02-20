import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { getCurrentAppByState } from 'selectors/apps'
import { getAllPages } from 'selectors/pages'

const SecondaryDashboard = ({ checksum, type, entries, tabInstalledInPage }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<div className="col-md-6">
			<p className="h6 text-uppercase"><b>Top 5 fans</b></p>
			{entries.length == 0 ?
				<div className="ita-empty text-cente">
					<h5>
						We still haven't collected any likes or comments.
					</h5>
				</div>
			:
				<div className="col-md-">
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
		<div className="col-md-6" style={{marginTop: '0px'}}>
			{tabInstalledInPage ? 
			<div className="alert alert-success" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-ok"></span>{' '}
				The app is currently installed, and collecting timeline activities from <a href={`https://fb.com/${tabInstalledInPage.identifier}`}>{tabInstalledInPage.name}</a>
			</div>
			:
			<div className="alert alert-warning" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-info-sign"></span>{' '}
				The app is currently not linked to any Facebook Page. Go to the <Link to={`/d/apps/${type}/${checksum}/setup-guide`}>Setup Guide</Link> and follow the instructions.
			</div>
			}
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		tabInstalledInPage: getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}) : null,
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getEntriesForPage(state).slice(0,5),
	}
}

export default connect(mapStateToProps)(SecondaryDashboard)