import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchText } from 'actions/filterText'

class SearchForm extends Component {
	componentDidMount() {
		this.refs.searchFormInput.focus()
	}
	render() {
		const { handleSearchChange } = this.props
		return (
			<form className="input-group ita-search-box">
				<span className="input-group-addon">
					<i className="glyphicon glyphicon-search"></i>
				</span>
				<input 
					onChange={e => handleSearchChange(e.target.value)}
					type="text" 
					className="form-control" 
					placeholder="Type here to search" 
					ref="searchFormInput" />
			</form>
		);
	}
}

const mapStateToProps = (state, props) => {
	return { 
		// users: _.values(getCurrentUsers(state, props))
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return { 
		handleSearchChange: text => {
			dispatch(searchText(text))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)