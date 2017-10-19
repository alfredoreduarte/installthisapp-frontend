import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import SearchForm from 'components/SearchForm'
import User from 'components/User'
import CreateVouchersContainer from 'modules/coupons/containers/CreateVouchersContainer'

const Vouchers = ({
	vouchers,
	selectedVouchers,
	selectedItems,
	fetchEntities,
	createCouponPath,
	showCreationModal,
}) => (
	<div className="ita-table-view">
		{showCreationModal && <CreateVouchersContainer />}
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Vouchers<br/>
						{vouchers.length > 0 && <small>{vouchers.length} in total</small>}
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}/ {selectedItems.length} 
							{' '}voucher{selectedItems.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4 hide">
					<SearchForm />
				</div>
				<div className="col-md-12 text-right">
					{vouchers.length > 0 && 
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchEntities}>
							Refresh
						</button>
						<Link to={createCouponPath} className="btn btn-sm btn-success btn-outline pull-right">
							Add coupon vouchers
						</Link>
					</ButtonToolbar>
					}
				</div>
				<div className="col-md-3 col-md-offset-9">
					<div className="ita-table-view-second-row hide">
						
					</div>
				</div>
			</div>
		</div>
		{vouchers.length == 0 ?
			<div className="ita-empty text-center">
				<h3>There are no vouchers yet</h3>
				<p><Link to={createCouponPath} className="btn btn-sm btn-success">Create voucher</Link></p>
			</div>
		:
			<Table className="ita-table">
				<thead>
					<tr>
						<th>
							<span>Code</span>
						</th>
						<th>
							<span>Status</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{vouchers.map(voucher => 
					<tr key={voucher.id}>
						<td>
							{voucher.code}
						</td>
						<td>
							{voucher.user && <User name={'Claimed by: ' + voucher.user.name} identifier={voucher.user.identifier} small />}
							{!voucher.user && <span className="text-success">available</span>}
						</td>
					</tr>
					)}
				</tbody>
			</Table>
		}
	</div>
)

export default Vouchers