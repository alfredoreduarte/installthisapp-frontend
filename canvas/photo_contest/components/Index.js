import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Photo from 'canvas/photo_contest/components/Photo'
import Header from 'canvas/photo_contest/components/Header'
import ToolBar from 'canvas/photo_contest/components/ToolBarIndex'

const Index = ({ 
	// Header
	title,
	subtitle,
	// Toolbar 
	canUpload,
	sortPhotos,
	uploadUrl,
	uploadButton,
	mostVoted,
	mostRecent,
	sort,
	search,
	searchQuery,
	// Photos
	votes,
	loggedUser,
	photos,
	handleVote,
	singlePhotoUrl,
}) => (
	<div className="container">
		<Header title={title} subtitle={subtitle} />
		<ToolBar 
			canUpload={canUpload} 
			uploadUrl={uploadUrl} 
			uploadButton={uploadButton}
			mostRecent={mostRecent}
			mostVoted={mostVoted}
			sortPhotos={sortPhotos}
			sort={sort}
			search={search}
			searchQuery={searchQuery}
			 />
		{photos.map( photo => 
			<div className="col-sm-4" key={photo.id}>
				<Photo 
					id={photo.id} 
					name={photo.user.name}
					votes={photo.votes.length} 
					voted={_.filter(votes, v => {
						return v.userId == loggedUser.id && v.photoId == photo.id
					}).length > 0}
					singlePhotoUrl={singlePhotoUrl}
					handleVote={() => handleVote(photo.id)}
					photoUrl={photo.thumbnailUrl} />
			</div>
		)}
	</div>
)

Index.propTypes = {
	loggedUser: PropTypes.object.isRequired, 
	votes: PropTypes.array.isRequired, 
	photos: PropTypes.array.isRequired, 
	sort: PropTypes.string.isRequired, 
	search: PropTypes.func.isRequired, 
	searchQuery: PropTypes.string.isRequired, 
	handleVote: PropTypes.func.isRequired, 
	uploadUrl: PropTypes.string.isRequired, 
	singlePhotoUrl: PropTypes.string.isRequired,
	sortPhotos: PropTypes.func.isRequired,
}

export default Index