import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import TimeAgo from 'react-timeago'
import Modal from 'react-modal'
import Select from 'react-select'
import { Link } from 'react-router'
import { Table, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { selectItemOnTable } from 'actions/users'
import { getPhotosForCurrentApp, getRandomWinner } from 'modules/photo_contest/selectors/photos'
import { isWinnerModalVisible } from 'modules/photo_contest/selectors/ui'
import { fetchPhotoContestEntities } from 'modules/photo_contest/actions/entities'
import { postDeletePhotos } from 'modules/photo_contest/actions/photos'
import { hideWinnerModal, showWinnerModal } from 'modules/photo_contest/actions/ui'
import FbPhoto from 'components/FbPhoto'
import PhotoDetail from 'modules/photo_contest/components/PhotoDetail'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const Photos = ({
	viewPhoto,
	backUrl,
	detailUrl,
	photos,
	selectedIds,
	fetchAgain,
	getRandomWinner,
	handleDelete,
	handleDeleteBatch,
	handleSelect,
	handleSelectBatch,
	randomWinner,
	winnerModalVisible,
	closeWinnerModal,
}) => (
	<div className="ita-table-view">
		{viewPhoto ? <PhotoDetail 
			show={viewPhoto ? true : false}
			photoId={viewPhoto}
			backUrl={backUrl}
			/> : null}
		{winnerModalVisible ? 
		<Modal
		isOpen={winnerModalVisible}
		// onAfterOpen={afterOpenFn}
		// onRequestClose={requestCloseFn}
		// closeTimeoutMS={n}
		style={{
			overlay: {

			},
			content: {
				top: '200px',
				right: '200px',
				left: '200px',
				bottom: '200px',
				textAlign: 'center',
			}
		}}
		contentLabel="Modal"
		>
			<h1>The winner is...</h1>
			<FbPhoto identifier={randomWinner.user.identifier} className="img-circle" />
			<p>{randomWinner.user.name}</p>
			<p><a onClick={closeWinnerModal}>close</a></p>
		</Modal>
		: null }
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Photos 
						<small className={selectedIds.length ? '' : 'hide'}>
							{' '}/ {selectedIds.length} 
							{' '}photo{selectedIds.length > 1 ? 's' : ''} selected
						</small>
						<small className={selectedIds.length ? 'hide' : ''}>
							{' '}/ {photos.length} 
							{' '}photo{photos.length > 1 ? 's' : ''} in total
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<div className="hide">
						<SearchForm />
					</div>
				</div>
				<div className={photos.length > 0 ? "col-md-8 text-right" : "hide"}>
					<ButtonToolbar>
						<button className="btn btn-default btn-sm pull-right" onClick={fetchAgain}>
							Refresh
						</button>
						<button className="btn btn-default btn-sm pull-right" onClick={getRandomWinner}>
							Get random winner
						</button>
					</ButtonToolbar>
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li className={selectedIds.length ? '' : 'hide'}>
							<a
								onClick={() => handleDeleteBatch(photos)}
								className="
									icon-tool-big 
									btn 
									btn-squared 
									glyphicon glyphicon-trash"
								>
							</a>
						</li>
					</ul>
				</div>
				<div className={photos.length > 0 ? "col-md-3 col-md-offset-9" : "hide"}>
					<div className="ita-table-view-second-row text-right">
						
					</div>
				</div>
			</div>
		</div>
		<Table className="ita-table">
			<thead>
				<tr>
					<th>
						<span>User</span>
					</th>
					<th>
						<span>Photo</span>
					</th>
					<th>
						<span>Votes</span>
					</th>
					<th>
						<span>Posted on</span>
					</th>
					<th className="text-right">
						<Checkbox 
							checked={photos.length > 0 && selectedIds.length == photos.length}
							checkboxClass="icheckbox-ita icon-tool-big pull-right"
							onChange={() => handleSelectBatch(photos)}
						 />
					</th>
				</tr>
			</thead>
			<tbody>
				{photos.map(p => 
				<tr key={p.id}>
					<td>
						<User name={p.user.name} identifier={p.user.identifier} small />
					</td>
					<td>
						<Link to={`${detailUrl}/${p.id}`}>
							<img 
								src={p.attachmentUrl} 
								style={{width: '100px'}} 
								className="img-responsive img-rounded" />
						</Link>
					</td>
					<td>
						{p.votes.length}
					</td>
					<td>
						<TimeAgo date={p.createdAt} />
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li>
								<a
									onClick={() => handleDelete(p.id)}
									className='
										icon-tool-big 
										btn 
										btn-squared 
										glyphicon glyphicon-trash'></a>
							</li>
							<li>
								<Checkbox 
									checked={selectedIds.indexOf(p.id) !== -1 ? true : false}
									checkboxClass="icheckbox-ita icon-tool-big pull-right"
									onChange={() => handleSelect(p.id)}
								/>
							</li>
						</ul>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const mapStateToProps = (state, props) => {
	const viewPhoto = props ? props.params.photoId : false
	return { 
		backUrl: `/d/apps/${props.params.type}/${props.params.checksum}/photos`,
		photos: getPhotosForCurrentApp(state),
		selectedIds: state.selectedItems,
		detailUrl: props.location.pathname,
		viewPhoto,
		winnerModalVisible: isWinnerModalVisible(state),
		randomWinner: getRandomWinner(state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAgain: () => dispatch(fetchPhotoContestEntities()),
		handleSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleSelectBatch: photos => {
			photos.map(p => dispatch(selectItemOnTable(p.id)))
		},
		handleDelete: id => {
			dispatch(postDeletePhotos([id]))
		},
		handleDeleteBatch: photos => {
			const ids = photos.map( p => p.id )
			dispatch(postDeletePhotos(ids))
			dispatch({
				type: 'RESET_SELECTED_ITEMS'
			})
		},
		getRandomWinner: () => {
			console.log('winner')
			dispatch(showWinnerModal())
			// console.log(getRandomWinner(state))
		},
		closeWinnerModal: () => {
			console.log('close winner')
			dispatch(hideWinnerModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)