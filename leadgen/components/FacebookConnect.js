import React from 'react'
import { Link } from 'react-router'

const FacebookConnect = ({
  // values
  adminId,
  adminName,
  connectingToFacebook,
  // actions
  fbLoginCallback,
}) => (
  <div className="col-md-12 text-center" style={{ marginBottom: '40px' }}>
    <br />
    <br />
    <p>
      <img src={`/images/user-placeholders/${adminId % 8}.png`} width="72px" height="72px" />
    </p>
    <h2>Welcome, {adminName}</h2>
    <br />
    <h4>Connect with Facebook to get your Lead Forms here</h4>
    <br />
    <br />
    <p>
      {connectingToFacebook ? (
        <button className="btn btn-primary btn-lg" disabled={true}>
          Please wait...
        </button>
      ) : (
        <FacebookLogin
          appId={process.env.FB_APP_ID}
          autoLoad={true}
          scope={'manage_pages'}
          textButton={'Connect to Facebook'}
          fields="name,email,picture"
          cssClass="btn btn-primary btn-lg"
          callback={fbLoginCallback}
        />
      )}
    </p>
  </div>
)

export default FacebookConnect
