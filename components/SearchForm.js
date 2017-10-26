import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchText } from 'actions/filterText'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  componentDidMount() {
    this.refs.searchFormInput.focus()
  }
  handleFocus() {
    this.setState({
      active: true,
    })
  }
  handleBlur() {
    this.setState({
      active: false,
    })
  }
  render() {
    const { handleSearchChange } = this.props
    return (
      <form className={`input-group ita-search-box ${this.state.active ? 'active' : null}`}>
        <span className="input-group-addon">
          <i className="glyphicon glyphicon-search" />
        </span>
        <input
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={e => handleSearchChange(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Type here to search"
          ref="searchFormInput"
        />
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => ({
  handleSearchChange: text => dispatch(searchText(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
