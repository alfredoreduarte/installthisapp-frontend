import React from 'react'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
import PlaceholderList from 'components/PlaceholderList'
import FaCircle from 'react-icons/lib/fa/circle'
import FaCheckCircle from 'react-icons/lib/fa/check-circle'

// const Summary = ({ checksum, type, entries, hasQuestions, applicationLog: { designEdited, fbTabInstalled } }) => (
const Summary = ({ checksum, type, entries, steps, completed, install, share, tabInstalled }) => (
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
						{!steps[0] ? <FaCircle size={50} color={'#D1D1D1'} /> : <FaCheckCircle size={50} color={'#6DBA4B'} />}
					</td>
					<td style={styles.td}>
						{!steps[0] ? <span>Add some <b>questions</b></span> : <s>Add some <b>questions</b></s>}
					</td>
					<td style={styles.td}>
						<Link className={`btn btn-block ${!steps[0] ? 'btn-primary' : 'btn-default'}`} to={`/d/apps/${type}/${checksum}/questions`}>Create questions</Link>
					</td>
				</tr>
				<tr>
					<td style={styles.td}>
						{!steps[1] ? <FaCircle size={50} color={'#D1D1D1'} /> : <FaCheckCircle size={50} color={'#6DBA4B'} />}
					</td>
					<td style={styles.td}>
						{!steps[1] ? <span>Edit the <b>template design</b></span> : <s>Edit the <b>template design</b></s>}
					</td>
					<td style={styles.td}>
						<Link className={`btn btn-block ${!steps[1] ? 'btn-primary' : 'btn-default'}`}  to={`/d/apps/${type}/${checksum}/design`}>Launch the Design Editor</Link>
					</td>
				</tr>
				<tr>
					<td style={styles.td}>
						{!steps[2] ? <FaCircle size={50} color={'#D1D1D1'} /> : <FaCheckCircle size={50} color={'#6DBA4B'} />}
					</td>
					<td style={styles.td}>
						{!steps[2] ? <span><b>Publish</b> the contest</span> : <s><b>Publish</b> the contest</s>}
					</td>
					<td style={styles.td}>
						{steps[2] ? 
						<button className="btn btn-block btn-primary btn-outline" onClick={share}>Share</button>
						:
						<button className="btn btn-block btn-success" onClick={install}>Publish</button>
						}
					</td>
				</tr>
				<tr>
					<td style={styles.td} colSpan={3}>
						{tabInstalled ? <s><b>Optional:</b> Display the contest inside a <Link to={`/d/apps/${type}/${checksum}/integrations`}>Facebook Page Tab</Link></s>
						: <span><b>Optional:</b> Display the contest inside a <Link to={`/d/apps/${type}/${checksum}/integrations`}>Facebook Page Tab</Link></span>}
					</td>
				</tr>
				</tbody>
			</table>
			<p className="text-right" style={{marginTop: '16px'}}>
				<small>Need help? Maybe our <a href="http://help.installthisapp.com/trivia" target="_blank">knowledge center</a> has some answers.</small>
			</p>
		</div>
		{false ? 
			<div className="col-md-6">
			{entries.length == 0 ?
				<div>
					<PlaceholderList amount={5} />
					<h5 className="text-center">Nobody has answered any questions yet.</h5>
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
								<b>{entry.totalCorrectAnswers} correct answers</b>
							</td>
						</tr>
						)}
					</tbody>
				</Table>
				<p><Link to={`/d/apps/${type}/${checksum}/answers`} className="btn btn-primary btn-sm" activeClassName="active">View full list</Link></p>
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