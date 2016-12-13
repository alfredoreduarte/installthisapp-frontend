import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Card = ({ 
	
}) => (
	<div className="col-md-12">
		<div className="page-header">
			<h1 className="text-center">Get a 50% discount</h1>
		</div>
		<h4 
			className="text-center text-muted"
			style={{marginBottom: '50px'}}
		>
			
		</h4>
		<div className="col-md-4 col-md-offset-4">
			<div className="panel panel-default">
				<div className="panel-body text-center">
					<p>
						<span className="h3">Try the Basic plan for 7 days</span>
					</p>
					<p>
						<span className="h4">pay <b>$14.45 instead of 29$</b></span><br/>for the first month and get:
					</p>
					<br/>
					<br/>
					<ul className="list-unstyled">
						<li>5 apps</li>
						<li>5 teammates</li>
						<li>in-app support via chat</li>
					</ul>
					<br/>
					<br/>
					<p>You'll only be charged after 7 days</p>
					<p><a href="#" className="btn btn-primary btn-lg btn-block text-uppercase">Start free trial</a></p>
					<br/>
					<br/>
					<p>
						<small>* You won't be charged until after 7 days.</small><br/>
						<small>* No contracts. Cancel at anytime.</small>
					</p>
				</div>
			</div>
			<p className="text-right"><small><a href="/d">Skip the discount, I'll decide later →</a></small></p>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)