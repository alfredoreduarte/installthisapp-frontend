import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Modal from 'react-modal'
import UserDetails from 'modules/top_fans/components/UserDetails'

const UserDetailsContainer = props => <UserDetails { ...props } />

const mapStateToProps = (state, props) => {
	const detailData = state.topFans.details[props.params.senderId]
	console.log('detailData')
	console.log(detailData)
	console.log(props.params)
	return { 
		show: props.params.senderId ? true : false,
		name: detailData.name,
		identifier: detailData.identifier,
		likes: detailData.likes,
		comments: detailData.comments,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleClose: () => dispatch(goBack()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsContainer)