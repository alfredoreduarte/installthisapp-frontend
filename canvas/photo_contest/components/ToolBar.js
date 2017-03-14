import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const ToolBar = ({ 
	canUpload,
	uploadUrl,
	backUrl,
	back,
	uploadButton, 
	mostVoted,
	mostRecent,
	sortPhotos,
	sort,
	search,
	searchQuery,
}) => (
	<div style={styles.toolbar}>
		<div style={styles.toolbarCell}>
			<Link to={backUrl} style={styles.button} className="ita-cali-button--secondary" data-editable-message-key="back">{back}</Link>
		</div>
		<div style={ {...styles.toolbarCell, justifyContent: 'flex-end'} }>
			{canUpload ? 
				<Link 
					to={uploadUrl} 
					style={styles.button} 
					className="ita-cali-button"
					data-editable-message-key="uploadButton"
					>{uploadButton}</Link>
			: null }
		</div>
	</div>
)

const styles = {
	button: {
		padding: '12px 24px',
		borderRadius: '3px',
		textAlign: 'center',
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
	uploadButton: PropTypes.string,
	mostVoted: PropTypes.string,
	mostRecent: PropTypes.string,
	sort: PropTypes.oneOf(['mostRecent', 'mostVoted']),
	searchQuery: PropTypes.string,
	sortPhotos: PropTypes.func,
	search: PropTypes.func,
}

export default ToolBar