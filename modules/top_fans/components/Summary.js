import React from 'react'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
import PlaceholderList from 'components/PlaceholderList'
import SummaryNumber from 'components/SummaryNumber'

const Summary = ({ checksum, type, entries, steps, completed, share }) => (
	<div>
		{completed == steps.length ? 
			<p className="h1 page-header">The contest is ready <small>-- share it everywhere!</small></p>
			:
			<p className="h1 page-header">Almost ready for launch</p>
		}
		<div className="col-md-6">
			{completed == steps.length ? 
				<img src="/images/rocket.gif" className="img-responsive animated fadeInUp" />
			: 
				<img src="/images/rocket.jpg" className="img-responsive shake-little shake-constant" />
			}
		</div>
		<div className="col-md-6">
			<h2 className="text-normal">Next steps</h2>
			<table style={{
				width: '100%',
			}}>
				<tbody>
				<tr>
					<td style={styles.td}>
						{!steps[0] ? <SummaryNumber num={1} /> : <SummaryNumber num={1} active={true} />}
					</td>
					<td style={styles.td}>
						{!steps[0] ? <span>Edit the <b>template design</b></span> : <s>Edit the <b>template design</b></s>}
					</td>
					<td style={styles.td}>
						<Link className={`btn btn-block ${!steps[0] ? 'btn-primary' : 'btn-default'}`}  to={`/d/apps/${type}/${checksum}/design`}>Launch the Design Editor</Link>
					</td>
				</tr>
				<tr>
					<td style={styles.td}>
						{!steps[1] ? <SummaryNumber num={2} /> : <SummaryNumber num={2} active={true} />}
					</td>
					<td style={styles.td}>
						{!steps[1] ? <span>Link and Track <b>Facebook page</b></span> : <s>Link a <b>Facebook page</b></s>}
					</td>
					<td style={styles.td}>
						{steps[1] ? 
						<button className="btn btn-block btn-primary btn-outline" onClick={share}>Share</button>
						:
						<Link className="btn btn-block btn-success" to={`/d/apps/${type}/${checksum}/setup-guide`}>Choose a Facebook Page</Link>
						}
					</td>
				</tr>
				</tbody>
			</table>
			<p className="text-right" style={{marginTop: '16px'}}>
				<small>Need help? Maybe our <a href="http://help.installthisapp.com/top-fans" target="_blank">knowledge center</a> has some answers.</small>
			</p>
		</div>
		{false ? 
			<div className="col-md-6">
			{entries.length == 0 ?
				<div>
					<PlaceholderList amount={5} />
					<h5 className="text-center">Nobody has played yet.</h5>
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
		: null}
	</div>
)

const styles = {
	td: {
		paddingTop: '16px',
		paddingBottom: '16px',
	}
}

export default Summary