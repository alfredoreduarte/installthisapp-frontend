import React from 'react'
import { connect } from 'react-redux'
import { postDeletePhotos } from 'modules/photo_contest/actions/photos'
import { getFilteredEntries, getRandomWinner } from 'modules/photo_contest/selectors/entries'
import { isWinnerModalVisible } from 'modules/photo_contest/selectors/ui'
import { fetchEntities, generateCsv } from 'modules/photo_contest/actions/entities'
import Photos from 'modules/photo_contest/components/Photos'

const PhotosContainer = props => <Photos {...props} />

const mapStateToProps = (state, props) => ({
	entries: getFilteredEntries(state),
	selectedItems: state.selectedItems,
	//
	backUrl: `/d/apps/${props.params.type}/${props.params.checksum}/photos`,
	detailUrl: props.location.pathname,
	viewPhoto: props ? props.params.photoId : false,
	winnerModalVisible: isWinnerModalVisible(state),
	randomWinner: getRandomWinner(state),
})

const mapDispatchToProps = (dispatch, props) => ({
	generateCsv: () => dispatch(generateCsv()),
	fetchEntries: () => dispatch(fetchEntities()),
	// fetchAgain: () => dispatch(fetchPhotoContestEntities()),
	handleSelect: id => dispatch(selectItemOnTable(id)),
	handleSelectBatch: photos => {
		photos.map(p => dispatch(selectItemOnTable(p.id)))
	},
	handleDelete: id => dispatch(postDeletePhotos([id])),
	handleDeleteBatch: photos => {
		const ids = photos.map(p => p.id)
		dispatch(postDeletePhotos(ids))
		dispatch({
			type: 'RESET_SELECTED_ITEMS',
		})
	},
	getRandomWinner: () => dispatch(showWinnerModal()),
	closeWinnerModal: () => dispatch(hideWinnerModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosContainer)
