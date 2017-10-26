import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let CouponForm = ({ active, vouchersCreatorPath, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Coupon
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Headline</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.voucherScreenHeadline'} 
						component="input"
						type="text" 
						placeholder={'Congratulations!'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Paragraph</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.voucherScreenCopy'} 
						component="textarea"
						cols={5}
						placeholder={'You got a coupon'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Coupon Label</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.voucherText'} 
						component="textarea"
						cols={5}
						placeholder={'20% OFF on all smartphones'} />
				</div>
				<div className="col-md-12">
					<p className="text-right">
						<a href={vouchersCreatorPath} target="_blank">Load coupon codes →</a>
					</p>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Button</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.voucherUseButtonLabel'} 
						component="input"
						type="text" 
						placeholder={'Use the coupon on our website'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Website URL</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'settings.redeemUrl'} 
						component="input"
						type="text" 
						placeholder={'http://yourwebsite.com'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Print Button</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.printButtonlabel'} 
						component="input"
						type="text" 
						placeholder={'Print my coupon'} />
				</div>
			</div>
		</div>
	</div>
</div>

CouponForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(CouponForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	return {
		vouchersCreatorPath: `/d/apps/${currentApp.applicationType}/${currentApp.checksum}/vouchers/create`
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(CouponForm)