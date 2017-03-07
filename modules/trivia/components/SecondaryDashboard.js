import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
import { getAnswersForCurrentApp } from 'modules/trivia/selectors/answers'
import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'

const SecondaryDashboard = ({ checksum, type, entries, hasQuestions }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<p className="h6 text-uppercase"><b>Top 5 users</b></p>
		<div className="col-md-6">
		{entries.length == 0 ?
			<div className="ita-empty text-cente">
				<h5>
					Nobody has answered any questions yet.
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
		<div className="col-md-6">
			{!hasQuestions ? 
			<div className="alert alert-warning" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-info-sign"></span>{' '}
				You should create some questions for the Trivia. <Link to={`/d/apps/${type}/${checksum}/questions`}>Start now</Link>.
			</div>
			:
			null
			}
			<div className="alert alert-info" style={{position: 'relative'}}>
				<span className="glyphicon glyphicon-info-sign"></span>{' '}
				Have questions? Maybe our <a href="http://help.installthisapp.com/trivia" target="_blank"><u><b>help center</b></u></a> has the answers.
			</div>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getAnswersForCurrentApp(state).slice(0,5),
		hasQuestions: getQuestionsForCurrentApp(state, props).length > 0,
	}
}

export default connect(mapStateToProps)(SecondaryDashboard)