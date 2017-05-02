import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { Checkbox } from 'react-icheck'
import SearchForm from 'components/SearchForm'
import ProductsCreate from 'modules/catalog/components/ProductsCreate'

const Products = ({
	products,
	handleDelete,
	selectedItems,
	fetchProducts,
	productsCreatePath,
	productsEditPath,
	showCreateModal,
	productToEdit,
	closeUrl,
}) => (
	<div className="ita-table-view">
		<ProductsCreate 
			show={showCreateModal} 
			closeUrl={closeUrl} 
			initialProduct={productToEdit} />
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Products 
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
					{products.length == 0 ?
						null
					:
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchProducts}>
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
				<div className={products.length > 0 ? "col-md-3 col-md-offset-9" : "hide"}>
					<div className="ita-table-view-second-row text-right">
						<Link 
							to={productsCreatePath}
							className="btn btn-sm btn-success">
							Create Product
						</Link>
					</div>
				</div>
			</div>
		</div>
		{products.length == 0 ?
			<div className="row">
				<div className="col-sm-12">
					<div className="ita-empty text-center">
						<br />
						<br />
						<h4 className="weight-thin animated fadeInDown">
							There are no products yet, create the first one
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
								to={productsCreatePath}
								className="btn btn-success animated fadeInUp">
								Create Product
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
						<th>
							<span>Price</span>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => 
					<tr key={product.id}>
						<td>
							{product.name}
						</td>
						<td>
							{product.price}
						</td>
						<td className="text-right">
							<ul className="list-inline list-no-margin">
								<li>
									<Link
										to={productsEditPath + `/${product.id}`}
										className='
											icon-tool-big 
											btn 
											btn-squared 
											glyphicon glyphicon-pencil'></Link>
								</li>
								<li>
									<a
										onClick={() => handleDelete(product.id)}
										className='
											icon-tool-big 
											btn 
											btn-squared 
											glyphicon glyphicon-trash'></a>
								</li>
								<li className="hide">
									<Checkbox 
										checked={selectedItems.indexOf(product.id) !== -1 ? true : false}
										checkboxClass="icheckbox-ita icon-tool-big pull-right"
										// onChange={() => handleSelect(product.id)}
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

export default Products