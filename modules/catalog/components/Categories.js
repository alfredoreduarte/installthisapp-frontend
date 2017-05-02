import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { Checkbox } from 'react-icheck'
import SearchForm from 'components/SearchForm'
import CategoriesCreate from 'modules/catalog/components/CategoriesCreate'

const Categories = ({
	categories,
	handleDelete,
	selectedItems,
	fetchCategories,
	categoriesCreatePath,
	categoriesEditPath,
	showCreateModal,
	categoryToEdit,
	closeUrl,
}) => (
	<div className="ita-table-view">
		<CategoriesCreate 
			show={showCreateModal} 
			closeUrl={closeUrl} 
			initialCategory={categoryToEdit} />
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Categories 
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}/ {selectedItems.length} 
							{' '}user{selectedItems.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
				</div>
				<div className="col-md-8 text-right">
					{categories.length == 0 ?
						null
					:
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchCategories}>
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
				<div className={categories.length > 0 ? "col-md-3 col-md-offset-9" : "hide"}>
					<div className="ita-table-view-second-row text-right">
						<Link 
							to={categoriesCreatePath}
							className="btn btn-sm btn-success">
							Create Category
						</Link>
					</div>
				</div>
			</div>
		</div>
		{categories.length == 0 ?
			<div className="row">
				<div className="col-sm-12">
					<div className="ita-empty text-center">
						<br />
						<br />
						<h4 className="weight-thin animated fadeInDown">
							There are no categories yet, create the first one
						</h4>
						<br />
						<br />
						<img 
							src="/images/dashboard-empty.png"
							style={{height: '100px'}}
							className="ita-empty-illustration animated fadeInUp" />
						<br />
						<br />
						<p>
							<Link 
								to={categoriesCreatePath}
								className="btn btn-success animated fadeInUp">
								Create Category
							</Link>
						</p>
					</div>
				</div>
			</div>
		:
			<Table className="ita-table">
				<thead>
					<tr>
						<th>
							<span>Name</span>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{categories.map(category => 
					<tr key={category.id}>
						<td>
							{category.name}
						</td>
						<td className="text-right">
							<ul className="list-inline list-no-margin">
								<li>
									<Link
										to={categoriesEditPath + `/${category.id}`}
										className='
											icon-tool-big 
											btn 
											btn-squared 
											glyphicon glyphicon-pencil'></Link>
								</li>
								<li>
									<a
										onClick={() => handleDelete(category.id)}
										className='
											icon-tool-big 
											btn 
											btn-squared 
											glyphicon glyphicon-trash'></a>
								</li>
								<li className="hide">
									<Checkbox 
										checked={selectedItems.indexOf(category.id) !== -1 ? true : false}
										checkboxClass="icheckbox-ita icon-tool-big pull-right"
									/>
								</li>
							</ul>
						</td>
					</tr>
					)}
				</tbody>
			</Table>
		}
	</div>
)

export default Categories