import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import FacebookLogin from 'react-facebook-login'

const Facebook = ({
  pageIdentifier,
  advanceWizard,
  steps,
  // Activity indicators
  connectingToFacebook,
  loadingPages,
  installingFacebookTab,
  //
  fbAppId,
  published,
  tabInstalledInPage,
  fbProfile,
  fbPages,
  fetchPages,
  selectPage,
  installTab,
  fbPageIdentifierForIntegration,
  fbLoginCallback,
  uninstallTab,
}) => (
  <div>
    {published ? (
      <div className="col-md-12">
        <div className="text-center">
          <h1 style={{ marginTop: '0px' }}>Display your app in a Facebook Page tab</h1>
          <h4>
            Just <b>two easy steps</b> and you're good to go.
          </h4>
          <br />
          <br />
        </div>
        <div className="col-md-8 col-md-offset-2">
          <div className="panel-group">
            <div
              className={`panel ${steps[0].done ? 'panel-success' : 'panel-default'} ${steps[0].disabled
                ? 'panel-disabled'
                : ''} panel-wizard`}>
              <div className="panel-heading" onClick={() => advanceWizard(0)}>
                <h4 className="panel-title">
                  {steps[0].done ? <span className="glyphicon glyphicon-ok" /> : <span className="glyphicon glyphicon-user" />}
                  <b>Connect with Facebook</b>
                </h4>
              </div>
              <div className={`panel-collapse collapse ${steps[0].active ? 'in' : ''}`}>
                <div className="panel-body">
                  {fbProfile ? (
                    <div>
                      <p>Signed in as: {fbProfile.name}</p>
                      <FacebookLogin
                        appId={process.env.FB_APP_ID}
                        autoLoad={false}
                        scope={'manage_pages'}
                        fields="name,email,picture"
                        cssClass="btn btn-default btn-xs"
                        textButton="Refresh permissions"
                        callback={fbLoginCallback}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>Sign in with Facebook</p>
                      <FacebookLogin
                        appId={process.env.FB_APP_ID}
                        autoLoad={true}
                        scope={'manage_pages'}
                        textButton={connectingToFacebook ? 'Please wait...' : 'Connect to Facebook'}
                        fields="name,email,picture"
                        cssClass="btn btn-primary btn-sm"
                        callback={fbLoginCallback}
                      />
                    </div>
                  )}
                </div>
                <div className="panel-footer text-right">
                  <button className="btn btn-success" onClick={() => advanceWizard(1)} disabled={!fbProfile}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`panel ${steps[1].done ? 'panel-success' : 'panel-default'} ${steps[1].disabled
                ? 'panel-disabled'
                : ''} panel-wizard`}>
              <div className="panel-heading" onClick={() => advanceWizard(1)}>
                <h4 className="panel-title">
                  {steps[1].done ? <span className="glyphicon glyphicon-ok" /> : <span className="glyphicon glyphicon-link" />}{' '}
                  <b>Select a Facebook Page</b>
                </h4>
              </div>
              {steps[1].active ? (
                <div className={`panel-collapse collapse in`}>
                  <div className="panel-body">
                    <p>
                      {tabInstalledInPage ? (
                        <span>
                          Tab installed in{' '}
                          <a href={`https://fb.com/${pageIdentifier}/app/${fbAppId}`} target="_blank" rel="noopener">
                            {tabInstalledInPage}
                          </a>
                        </span>
                      ) : (
                        'Select a Facebook Page'
                      )}
                    </p>
                    {tabInstalledInPage ? (
                      <p>
                        <small>
                          <a
                            href="javascript:void(0)"
                            // className="btn btn-xs btn-danger"
                            className="text-danger"
                            disabled={installingFacebookTab}
                            onClick={() => uninstallTab()}>
                            {installingFacebookTab ? 'Please wait...' : 'Uninstall tab'}
                          </a>
                        </small>
                      </p>
                    ) : null}
                    <div className="row">
                      <div className="col-md-12">
                        {tabInstalledInPage ? null : (
                          <select
                            className="form-control"
                            value={fbPageIdentifierForIntegration || ''}
                            onChange={e => selectPage(e.target.value)}
                            disabled={fbPages.length == 0 || tabInstalledInPage}>
                            <option value={''} disabled>
                              -- Facebook Page --
                            </option>
                            {fbPages.map(page => (
                              <option key={page.id} value={page.identifier}>
                                {page.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    {tabInstalledInPage ? null : (
                      <button
                        className="btn btn-primary"
                        onClick={() => installTab()}
                        disabled={!fbPageIdentifierForIntegration || installingFacebookTab}>
                        {installingFacebookTab ? 'Please wait...' : 'Install tab'}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="col-md-12">
        <div className="page-header">
          <h1 className="text-center" style={{ marginTop: '0px' }}>
            Display your app in a Facebook Page tab
          </h1>
        </div>
        <br />
        <br />
        <div className="alert alert-warning" role="alert">
          <b>Step required:</b> Please publish your app first, using the green <i>Publish</i> button at the top.
        </div>
      </div>
    )}
  </div>
)

export default Facebook
