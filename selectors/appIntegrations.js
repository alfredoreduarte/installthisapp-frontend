import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

export const getCurrentAppFbTabIntegration = createSelector(getCurrentAppByState, currentApp =>
	_.find(currentApp.appIntegrations, integration => integration.integrationType == 'fb_tab')
)

export const getCurrentAppFbPageFeedWebhookIntegration = createSelector(getCurrentAppByState, currentApp =>
	_.find(currentApp.appIntegrations, integration => integration.integrationType == 'fb_webhook_page_feed')
)
