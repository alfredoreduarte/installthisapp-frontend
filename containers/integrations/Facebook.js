import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import { setAlert } from 'actions/alerts'
import FacebookLogin from 'react-facebook-login'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { getCurrentAppFbTabIntegration } from 'selectors/appIntegrations'
import { installFacebookTab, uninstallFacebookTab, updateAppSettings } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'

import Facebook from 'components/integrations/Facebook'

const IntegrationFacebook = ({
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
  <Facebook
    pageIdentifier={pageIdentifier}
    advanceWizard={advanceWizard}
    steps={steps}
    connectingToFacebook={connectingToFacebook}
    loadingPages={loadingPages}
    installingFacebookTab={installingFacebookTab}
    fbAppId={fbAppId}
    published={published}
    tabInstalledInPage={tabInstalledInPage}
    fbProfile={fbProfile}
    fbPages={fbPages}
    fetchPages={fetchPages}
    selectPage={selectPage}
    installTab={installTab}
    fbPageIdentifierForIntegration={fbPageIdentifierForIntegration}
    fbLoginCallback={fbLoginCallback}
    uninstallTab={uninstallTab}
  />
)

const mapStateToProps = (state, props) => {
  // Does the user have a linked FB profile?
  const fbProfile = state.admin.fbProfile
  // Is the app currently published?
  const published = getCurrentAppByState(state).status == 'installed'
  // Does it have a tab integration?
  const tabIntegration = getCurrentAppFbTabIntegration(state)
  const tabIntegrationPageIdentifier = tabIntegration ? tabIntegration.settings.fbPageIdentifier : null
  // Which page is the app integrated with?
  // const integratedPage = tabIntegration ? _.find(getAllPages(state), page => page.identifier == `${tabIntegrationPageIdentifier}`) : null
  const integratedPage = tabIntegration
    ? _.find(getAllPages(state), page => parseInt(page.identifier) == tabIntegrationPageIdentifier)
    : null
  const steps = [
    {
      active: state.wizard.step == 0 && !integratedPage,
      done: fbProfile ? true : false,
      disabled: false,
    },
    {
      active: state.wizard.step == 1 || integratedPage,
      done: integratedPage ? true : false,
      disabled: fbProfile ? false : true,
    },
  ]
  return {
    pageIdentifier: integratedPage ? integratedPage.identifier : null,
    steps,
    // activity indicators
    installingFacebookTab: state.activityIndicators.installingFacebookTab,
    loadingPages: state.activityIndicators.loadingPages,
    connectingToFacebook: state.activityIndicators.connectingToFacebook,
    //
    fbAppId: tabIntegration ? tabIntegration.settings.fbApplicationIdentifier : null,
    published,
    tabInstalledInPage: integratedPage ? integratedPage.name : null,
    fbProfile,
    fbPages: getAllPages(state),
    fbPageIdentifierForIntegration: state.admin.fbPageIdentifierForIntegration,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  // fb verification: The fbLoaded var is created at dashboard.ejs
  setTimeout(function() {
    if (!fbLoaded) {
      console.log('UNABLE TO LOAD FB SCRIPT')
      const alS =
        "We're not being able to connect to Facebook. \
						Please disable any ad-blocker or whitelist v3.installthisapp.com, \
						then reload the page. We don't show any ads here anyway 😇"
      dispatch(setAlert('Whoops!', alS))
    }
  }, 5 * 1000)
  // ! fb verification
  return {
    advanceWizard: step =>
      dispatch({
        type: 'UPDATE_WIZARD_STEP',
        step,
      }),
    fbLoginCallback: response => dispatch(fbConnect(response)),
    fetchPages: () => dispatch(fetchFacebookPages()),
    selectPage: fbPageIdentifier => {
      dispatch({
        type: 'SET_FB_PAGE_IDENTIFIER_FOR_INTEGRATION',
        payload: fbPageIdentifier,
      })
    },
    installTab: () => dispatch(installFacebookTab()),
    uninstallTab: () => dispatch(uninstallFacebookTab()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationFacebook)
