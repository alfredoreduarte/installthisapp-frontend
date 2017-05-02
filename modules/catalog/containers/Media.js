import React from 'react'
import { connect } from 'react-redux'
import { getFilteredMedia } from 'modules/catalog/selectors/media'
import { fetchEntities } from 'modules/catalog/actions/entities'
import { createMedium, deleteMedium } from 'modules/catalog/actions/media'
import MediaView from 'modules/catalog/components/Media'

const Media = ({
	media,
	handleDelete,
	selectedItems,
	fetchMedia,
	createMedium,
}) => (
	<MediaView
		media={media}
		handleDelete={handleDelete}
		fetchMedia={fetchMedia}
		createMedium={createMedium}
		selectedItems={selectedItems}
	/>
)

const mapStateToProps = state => ({ 
	media: getFilteredMedia(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchMedia: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteMedium(id)),
	createMedium: (acceptedFiles, rejectedFiles) => dispatch(createMedium(acceptedFiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Media)