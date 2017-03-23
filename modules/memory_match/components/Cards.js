import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Card from 'modules/memory_match/components/Card'

const Cards = ({
	cards,
	selectedItems,
	fetchCards,
	createCard,
	handleDelete,
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Cards <br/>
						<small>
							Add cards here, the game will automatically duplicate them later.
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					
				</div>
				<div className="col-md-8 text-right hide">
					{cards.length == 0 ?
						null
					:
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchCards}>
							Refresh
						</button>
					</ButtonToolbar>
					}
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li className={selectedItems.length ? '' : 'hide'}>
							<a 
								href="javascript:void(0)" 
								className='
									icon-tool-big 
									btn 
									btn-squared 
									glyphicon 
									glyphicon-cloud-download'></a>
						</li>
					</ul>
				</div>
				<div className="col-md-3 col-md-offset-9">
					<div className="ita-table-view-second-row hide">
						
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-md-3">
				<Dropzone maxSize={2048000} onDrop={createCard} multiple={true} accept="image/*" style={{
					height: '240px',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					cursor: 'pointer',
					border: '2px dashed #0D9EFF',
					padding: '20px',
				}}>
					<div>
						<p>Try dropping some files here, or click to select files to upload.</p>
						<p><small>400x400px</small></p>
						<p><small>Max. size: 2MB</small></p>
					</div>
				</Dropzone>
			</div>
			{cards.map( card => <div className="col-md-3" key={card.id}><Card handleDelete={() => handleDelete(card.id)} status={card.status} attachmentUrl={card.attachmentUrl} /></div>)}
		</div>
	</div>
)

export default Cards