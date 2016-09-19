import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import TimeAgo from 'react-timeago'
import Select from 'react-select'
import { Link } from 'react-router'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { selectItemOnTable } from 'actions/users'
import { getPhotosForCurrentApp } from 'modules/photo_contest/selectors/photos'
import { fetchPhotoContestEntities } from 'modules/photo_contest/actions/entities'
import { postDeletePhotos } from 'modules/photo_contest/actions/photos'
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
	handleDelete,
	handleDeleteBatch,
	handleSelect,
	handleSelectBatch,
}) => (
	<div className="ita-table-view">
		{viewPhoto ? <PhotoDetail 
			show={viewPhoto ? true : false}
			photoId={viewPhoto}
			backUrl={backUrl}
			/> : null}
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Photos 
						<small className={selectedIds.length ? '' : 'hide'}>
							{' '}/ {selectedIds.length} 
							{' '}photo{selectedIds.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
					<button className="btn btn-default btn-sm" onClick={() => fetchAgain()}>
						Refresh table
					</button>
				</div>
				<div className={photos.length > 0 ? "col-md-8 text-right" : "hide"}>
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
								src={p.thumbnailUrl} 
								style={{width: '100px'}} 
								className="img-responsive img-rounded" />
						</Link>
					</td>
					<td>
						{p.votes.length}
					</td>
					<td>
						<TimeAgo date={p.createdOn} />
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
	const viewPhoto = props.params.photoId
	console.log('location', props)
	return { 
		backUrl: `/d/apps/${props.params.type}/${props.params.checksum}/photos`,
		photos: getPhotosForCurrentApp(state, props),
		selectedIds: state.selectedItems,
		detailUrl: props.location.pathname,
		viewPhoto,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAgain: () => dispatch(fetchPhotoContestEntities(props.params.checksum)),
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)