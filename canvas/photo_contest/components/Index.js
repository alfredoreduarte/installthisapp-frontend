import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Photo from 'canvas/photo_contest/components/Photo'
import Header from 'canvas/photo_contest/components/Header'

const Index = ({ photos, handleVote, uploadUrl, singlePhotoUrl }) => (
	<div className="container">
		<Header title={'This is the main heading'} subtitle={'Nibh Mattis Ridiculus Egestas'} />
		<ToolBar uploadUrl={uploadUrl} />
		<div className="">
			<div className="row">
				{photos.map( photo => 
					<div className="col-sm-4" key={photo.id}>
						<Photo 
							id={photo.id} 
							name={photo.user.name}
							votes={photo.votes.length} 
							voted={true}
							singlePhotoUrl={singlePhotoUrl}
							handleVote={() => handleVote(photo.id)}
							photoUrl={photo.thumbnailUrl} />
					</div>
				)}
			</div>
		</div>
	</div>
)

Index.propTypes = {
	photos: PropTypes.array.isRequired, 
	handleVote: PropTypes.func.isRequired, 
	uploadUrl: PropTypes.string.isRequired, 
	singlePhotoUrl: PropTypes.string.isRequired,
}

export default Index