import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Medium from 'modules/catalog/components/Medium'

const Media = ({
	media,
	selectedItems,
	fetchMedia,
	createMedium,
	handleDelete,
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Media <br/>
						<small>
							
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					
				</div>
				<div className="col-md-8 text-right hide">
					{media.length == 0 ?
						null
					:
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchMedia}>
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
				<Dropzone maxSize={2048000} onDrop={createMedium} multiple={true} accept="image/*" style={{
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
			{media.map( medium => <div className="col-md-3" key={medium.id}><Medium handleDelete={() => handleDelete(medium.id)} status={medium.status} attachmentUrl={medium.attachmentUrl} /></div>)}
		</div>
	</div>
)

export default Media