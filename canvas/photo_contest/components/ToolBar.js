import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const ToolBar = ({ uploadUrl = '', backUrl = '' }) => (
	<div style={styles.toolbar}>
		<div style={styles.toolbarCell}>
			{backUrl == '' ? 
			<form className="input-group ita-cali-search-form" style={styles.searchForm}>
				<span className="input-group-addon" style={styles.searchFormAddon}>
					<i className="glyphicon glyphicon-search"></i>
				</span>
				<input 
					onChange={e => console.log(e.target.value)}
					type="text" 
					className="form-control" 
					style={styles.searchFormInput}
					placeholder="Search" />
			</form>
			:
			<Link to={backUrl} style={styles.button} className="ita-cali-button--secondary">← Back</Link>
			}
		</div>
		{backUrl == '' ? <div style={{...styles.toolbarCell, ...{flex: 2, justifyContent: 'center'}}}>
			<span style={styles.tabItem} className="ita-cali-sorter ita-cali-sorter--active">Most Voted</span>
			{' | '}
			<span style={styles.tabItem} className="ita-cali-sorter">Most Recent</span>
		</div> : null}
		{uploadUrl != '' ? 
		<div style={Object.assign({}, styles.toolbarCell, {
			justifyContent: 'flex-end'
		})}>
			<Link to={uploadUrl} style={styles.button} className="ita-cali-button">Upload Photo</Link>
		</div> : null}
	</div>
)

const styles = {
	button: {
		padding: '12px 24px',
		borderRadius: '3px',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-around',
		paddingTop: 24,
		paddingBottom: 24,
	},
	tabItem: {
		marginLeft: '10px',
		marginRight: '10px',
		cursor: 'pointer',
	},
	toolbarCell: {
		display: 'flex',
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	searchForm: {
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
	},
	searchFormAddon: {
		background: 'none',
		padding: '5px',
		border: 'none',
	},
	searchFormInput: {
		background: 'none',
		border: 'none',
		boxShadow: 'none',
	},
}

ToolBar.propTypes = {
	uploadUrl: PropTypes.string,
	backUrl: PropTypes.string,
}

export default ToolBar