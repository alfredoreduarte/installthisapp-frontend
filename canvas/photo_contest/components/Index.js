import React from 'react'
import { Link } from 'react-router'
// import Masonry from 'react-masonry-component'
import Photo from 'canvas/photo_contest/components/Photo'

const Index = ({ photos, handleVote, uploadUrl }) => (
	<div className="container">
		<div className="col-sm-12 ita-title-bar">
			<div className="ita-cali-title">This is the main heading</div>
			<div className="ita-cali-subtitle">Nibh Mattis Ridiculus Egestas</div>
		</div>
		<div className="col-sm-12">
			<div className="row ita-toolbar">
				<div className="col-sm-4">
					
				</div>
				<div className="col-sm-4 text-center">
					
				</div>
				<div className="col-sm-4 text-right">
					<Link to={uploadUrl} className="btn btn-primary btn-sm">Upload Photo</Link>
				</div>
			</div>
		</div>
		<div className="">
			{photos.map( photo => 
				<div className="col-sm-4" key={photo.id}>
					<Photo 
						id={photo.id} 
						name={photo.user.name}
						votes={photo.votes.length} 
						voted={true}
						handleVote={() => handleVote(photo.id)}
						photoUrl={photo.assetUrl} />
				</div>
			)}
		</div>
	</div>
)

export default Index