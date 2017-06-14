import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchEntities } from 'canvas/top_fans/actions/index'
import { getEntries } from 'canvas/top_fans/selectors/entries'
import { getScoreForUser } from 'canvas/top_fans/selectors/user'
import { getSingleUserScores } from 'canvas/top_fans/actions/user'
import IndexView from 'canvas/top_fans/components/Index'

class Index extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IndexView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = state => {
	const entries = getEntries(state)
	return {
		...state.messages,
		...state.images,
		entries,
		maxScore: entries.length > 0 ? entries[0].score : 0,
		currentUserScore: getScoreForUser(state),
		currentUserName: state.currentUserData.name,
		currentUserIdentifier: state.currentUserData.identifier,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSingleUserScores: () => {
			dispatch(fetchEntities())
			dispatch(getSingleUserScores())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)