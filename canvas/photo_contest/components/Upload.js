import React from 'react'
import { Link } from 'react-router'
import Photo from 'canvas/photo_contest/components/Photo'

const Upload = ({ uploadPhoto, backUrl }) => (
	<div className="container">
		<div className="col-sm-12 ita-title-bar">
			<div className="ita-cali-title">Upload Photo</div>
		</div>
		<div className="col-sm-12">
			<div className="row ita-toolbar">
				<div className="col-sm-4">
					<Link to={backUrl} className="btn btn-primary btn-sm">Back</Link>
				</div>
				<div className="col-sm-4 text-center">
					
				</div>
				<div className="col-sm-4 text-right">
					
				</div>
			</div>
		</div>
		<div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
			<div className="form-group">
				<label>Photo</label>
				<input type="file" name="photo[attachment]" onChange={uploadPhoto} />
			</div>
			<div className="form-group">
				<label>Caption</label>
				<textarea className="form-control" name="photo[caption]" />
			</div>
			<div className="form-group">
				<button className="btn btn-primary">Upload Photo</button>
			</div>
		</div>
	</div>
)

export default Upload