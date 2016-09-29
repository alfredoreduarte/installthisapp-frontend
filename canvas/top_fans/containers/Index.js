import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getEntries } from 'canvas/top_fans/selectors/entries'
import IndexView from 'canvas/top_fans/components/Index'

class Index extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IndexView { ...this.props } /> : <Loading />
	}
}

const handleScore = score => score ? score : 0

const mapStateToProps = state => {
	const likeMultiplier = state.settings.pointsPerLike
	const commentMultiplier = state.settings.pointsPerComment
	const entries = getEntries(state).map(entry => {
		const score = handleScore(entry.likes) * likeMultiplier + handleScore(entry.comments) * commentMultiplier
		return {
			...entry,
			likes: handleScore(entry.likes),
			comments: handleScore(entry.comments),
			score,
		}
	})
	console.log('entries')
	console.log(JSON.stringify(entries))
	return {
		...state.messages,
		entries,
		likeMultiplier,
		commentMultiplier,
		maxScore: entries[0].score,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)