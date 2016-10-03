import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Header from 'canvas/photo_contest/components/Header'
import ToolBar from 'canvas/photo_contest/components/ToolBar'

const Upload = ({ title, subtitle, uploadPhoto, submitButton, photoFormLabel, captionFormLabel, back, backUrl, busy }) => (
	<div className="container">
		<Header title={title} subtitle={subtitle} />
		<ToolBar backUrl={backUrl} back={back} />
		<div className="col-xs-12 col-sm-6">
			<div className="form-group">
				<label className="ita-cali-form-label" data-editable-message-key="photoFormLabel">{photoFormLabel}</label>
				<input type="file" style={styles.input} className="form-control" name="photo[attachment]" />
			</div>
		</div>
		<div className="col-xs-12 col-sm-6">
			<div className="form-group">
				<label className="ita-cali-form-label" data-editable-message-key="captionFormLabel">{captionFormLabel}</label>
				<textarea style={styles.input} className="form-control ita-cali-input" name="photo[caption]" rows={10} />
			</div>
			<div className="form-group text-right">
				<button 
					style={styles.button} 
					className="ita-cali-button" 
					onClick={uploadPhoto}
					disabled={busy}
					data-editable-message-key="submitButton"
					>
					{busy ? 'Uploading...' : submitButton}
				</button>
			</div>
		</div>
	</div>
)

const styles = {
	button: {
		padding: '12px 24px',
		borderRadius: '3px',
	},
	input: {
		borderRadius: '3px',
		boxShadow: 'none',
		":hover": {
			boxShadow: 'none',
		}
	},
}

Upload.propTypes = {
	uploadPhoto: PropTypes.func.isRequired,
	backUrl: PropTypes.string.isRequired,
	submitButton: PropTypes.string.isRequired,
	photoFormLabel: PropTypes.string.isRequired,
	captionFormLabel: PropTypes.string.isRequired,
	back: PropTypes.string.isRequired,
	busy: PropTypes.bool.isRequired,
}

export default Upload