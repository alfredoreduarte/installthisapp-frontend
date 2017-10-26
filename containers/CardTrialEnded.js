//
// @CardTrialEnded
//
// Ventana modal sin fotos
// plan: basic
// coupon: no
//
import React from 'react'
import FaClose from 'react-icons/lib/fa/close'
import TakeMoney from 'components/StripeButton'

const CardTrialEnded = ({ busy, plan, onSuccess }) => (
  <div
    className="container-flex container-fullheight container-cancel ita-flex-justify-center"
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.2)',
      zIndex: 1,
    }}>
    <div
      className="animated fadeInDown"
      style={{
        border: '1px solid #ddd',
        boxShadow: '0px 12px 25px rgba(0,0,0,.2)',
        padding: '40px 20px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '60vw',
        minHeight: '85vh',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <div
        style={{
          marginBottom: '20px',
        }}>
        <a
          href="/d"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}>
          <FaClose size={22} color={'rgba(0,0,0,.3)'} />
        </a>
        <h1
          style={{
            textAlign: 'center',
          }}>
          Upgrade now and keep your contests running
        </h1>
        <p
          style={{
            textAlign: 'center',
          }}>
          Start now, pay next week. Cancel whenever you want.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="col-md-6 text-center">
          <h2
            style={{
              margin: '0px',
            }}>
            <b>$29/mo</b>
          </h2>
          <h5
            style={{
              letterSpacing: '1px',
              marginBottom: '0px',
              opacity: 0.5,
            }}
            className="text-uppercase">
            <b>
              Start now<br />Pay later
            </b>
          </h5>
        </div>
        <div className="col-md-6">
          <h4>
            <b>What you'll get:</b>
          </h4>
          <ul className="list-unstyled" style={{ lineHeight: 1.8, fontSize: '16px', marginLeft: '10px' }}>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />
              <b>5</b> simultaneous contests
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />In-app support via chat
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />All of our current and{' '}
              <a href="https://installthisapp.com/apps" target="_blank" rel="noopener">
                upcoming apps
              </a>
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />Facebook Tab integration
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />Standalone public webpage
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />Mobile and desktop views
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />Customize or translate <b>all</b>{' '}
              of the contest's texts
            </li>
            <li>
              <span style={{ marginRight: '10px' }} className="glyphicon glyphicon-ok text-success" />100% customizable styles and
              images
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-12 text-center">
        {plan ? (
          <TakeMoney planId={plan.id} onSuccess={onSuccess} couponCode={null}>
            <button
              style={{ letterSpacing: '1px', fontWeight: '400', fontSize: '20px' }}
              className={`btn text-uppercase btn-success btn-lg`}
              disabled={busy}>
              {busy ? 'Please wait...' : 'Start now'}
            </button>
          </TakeMoney>
        ) : (
          <button className="btn btn-primary btn-lg" disabled>
            No plans currently available
          </button>
        )}
      </div>
    </div>
  </div>
)

export default CardTrialEnded
