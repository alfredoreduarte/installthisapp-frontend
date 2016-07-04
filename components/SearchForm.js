import React, { Component } from 'react'

export default class SearchForm extends Component {
	componentDidMount() {
		this.refs.searchFormInput.focus()
	}
	render() {
		return (
			<form className="input-group ita-search-box">
				<span className="input-group-addon">
					<i className="glyphicon glyphicon-search"></i>
				</span>
				<input type="text" className="form-control" placeholder="Type here to search" ref="searchFormInput" />
			</form>
		);
	}
}

export default SearchForm