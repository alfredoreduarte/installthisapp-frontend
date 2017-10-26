import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { Animate } from 'react-move'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import FaCircleO from 'react-icons/lib/fa/circle-o'
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import MdCloud from 'react-icons/lib/md/cloud'
import MdClose from 'react-icons/lib/md/close'
import StepLabel from 'leadgen/components/StepLabel'
import FbPhoto from 'components/FbPhoto'

const SourceTestModal = ({
  // values
  sourceForTesting,
  testStatus,
  fbPageIdentifier,
  testLeadData,
  // actions
  handleSendTest,
  handleHide,
  show,
  showDestinationFormForSourceWithId,
}) => (
  <Animate
    // Set some default data
    default={{
      scale: 0.8,
      opacity: 0,
    }}
    // Update your data to whatever you want
    data={{
      scale: 1,
      opacity: 1,
    }}
    duration={800}>
    // easing='easeQuadIn'
    {data => (
      <Modal
        isOpen={show ? true : false}
        onAfterOpen={() => console.log('afteropen')}
        onRequestClose={() => console.log('request close')}
        contentLabel="Modal"
        style={{
          overlay: {
            position: 'fixed',
            opacity: `${data.opacity}`,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            backgroundColor: 'rgba(80, 88, 98, .9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            transform: `scale(${data.scale})`,
            opacity: `${data.opacity}`,
            overflow: 'visible',
            position: 'absolute',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            border: '1px solid rgb(204, 204, 204)',
            background: 'rgb(255, 255, 255)',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0,0,0,.1)',
            width: '50%',
            padding: '20px',
          },
        }}>
        <MdClose
          size="16"
          style={{
            color: 'white',
            cursor: 'pointer',
            position: 'absolute',
            top: '-20px',
            right: '-20px',
          }}
          onClick={handleHide}
        />
        <StepLabel number={2} />
        <h1 className="text-center" style={{ fontSize: '24px' }}>
          {testStatus.receivedOnServer ? <span>Success!</span> : <span>Test the connection</span>}
        </h1>
        {!testStatus.receivedOnServer ? <p className="text-center">We'll send a test lead to confirm it's working.</p> : null}
        {testStatus.receivedOnServer ? (
          <div style={{ marginBottom: '20px' }}>
            <p className="text-center">Review the lead below.</p>
            <p className="text-center">We'll use this as a sample for setting up the destinations for this source.</p>
          </div>
        ) : null}
        <div
          style={{
            padding: '40px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img
            className="img-rounded"
            style={{
              width: '100px',
            }}
            src={`https://graph.facebook.com/${fbPageIdentifier}/picture?type=large`}
          />
          {testStatus.receivedOnServer ? (
            <div
              style={{
                width: '100px',
                height: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FaCheckCircleO className="text-success animated fadeInUp" size="26" />
            </div>
          ) : (
            <div
              style={{
                width: '100px',
                height: '10px',
                background: '#d4f2ff',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
              {testStatus.sent && !testStatus.receivedOnServer ? <div className="leadgen-flow active" /> : null}
            </div>
          )}
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '5px',
              background: '#AFD885',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <MdCloud size="50" style={{ color: 'white' }} />
          </div>
        </div>
        {testLeadData.length ? (
          <div style={{ height: '200px', overflow: 'scroll', marginBottom: '20px' }}>
            <table className="table table-striped table-bordered">
              <tbody>
                {testLeadData.map(field => (
                  <tr key={field.name}>
                    <td>
                      <b>{field.name}</b>
                    </td>
                    <td>{field.values}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {!testStatus.sent && !testStatus.receivedOnServer ? (
          <p className="text-center">
            <a onClick={() => handleSendTest(sourceForTesting.id)} className="btn btn-success">
              Send Test Lead
            </a>
          </p>
        ) : null}
        {testStatus.sent && !testStatus.receivedOnServer ? (
          <p className="text-center">
            <a disabled={true} className="btn btn-success">
              Testing...
            </a>
          </p>
        ) : null}
        {testStatus.sent && testStatus.receivedOnServer ? (
          <div className="row">
            <div className="col-md-6">
              <a onClick={() => handleSendTest(sourceForTesting.id)} className="btn btn-primary btn-outline btn-sm pull-left">
                Test again
              </a>
            </div>
            <div
              className="col-md-6"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FaArrowRight
                size="20"
                className="animated wobble"
                style={{
                  animationIterationCount: 'infinite',
                }}
              />
              <a onClick={() => showDestinationFormForSourceWithId(sourceForTesting.id)} className="btn btn-success pull-right">
                Send leads from this form to...
              </a>
            </div>
          </div>
        ) : null}
        {!testStatus.receivedOnServer ? (
          <div>
            <hr />
            <ul className="col-md-6 col-md-offset-3 list-unstyled">
              {testStatus.sent ? (
                <li>
                  <p className="text-success">
                    <FaCheckCircleO size="16" className="pull-right" /> Send Lead data
                  </p>
                </li>
              ) : (
                <li>
                  <FaCheckCircleO size="16" className="text-muted pull-right" />
                  <p className="text-muted">Send Lead data</p>
                </li>
              )}
              {testStatus.receivedOnServer ? (
                <li>
                  <p className="text-success">
                    <FaCheckCircleO size="16" className="pull-right" /> Receive Lead from Facebook
                  </p>
                </li>
              ) : (
                <li>
                  <FaCheckCircleO size="16" className="text-muted pull-right" />
                  <p className="text-muted">Receive Lead from Facebook</p>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </Modal>
    )}
  </Animate>
)
export default SourceTestModal
