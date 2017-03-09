import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import User from 'components/User'
// import { getAnswersForCurrentApp } from 'modules/trivia/selectors/answers'
// import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'

const SecondaryDashboard = ({ checksum, type, photos }) => (
	<div>
		<p className="h1 page-header">Summary</p>
		<p className="h6 text-uppercase"><b>Top 5 users</b></p>
		<div className="col-md-6">
		{photos.length == 0 ?
			<div className="ita-empty text-cente">
				<h5>
					Nobody has posted photos yet.
				</h5>
			</div>
		:
			<div>
			<Table className="ita-table">
				<tbody>
					{photos.map(photo => 
					<tr key={photo.user.identifier}>
						<td>
							<User name={photo.user.name} identifier={photo.user.identifier} small />
						</td>
						<td>
							<b>{photo.votes.length} correct answers</b>
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
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		photos: [],
	}
}

export default connect(mapStateToProps)(SecondaryDashboard)