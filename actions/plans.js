import _ from 'lodash'

const plansDictionary = [
  {
    stripeId: 'basic',
    copy: [
      'For solo businesses owners',
      'Up to 5 apps',
      'In-app support via chat',
      'Facebook Tab integration',
      'Standalone public webpage for your contests',
      'Mobile and desktop views',
      '100% customizable styles, texts and images',
    ],
  },
  {
    stripeId: 'demo',
    copy: [
      'For InstallThisApp V2 users',
      'Up to 5 apps',
      'In-app support via chat',
      'Facebook Tab integration',
      'Standalone public webpage for your contests',
      'Mobile and desktop views',
      '100% customizable styles, texts and images',
    ],
  },
  {
    stripeId: 'agency',
    copy: [
      'For a team of marketers and designers',
      'Unlimited apps',
      '5 Seats',
      'Real-time stats',
      'Detailed campaign reports',
      'Conversion funnel report',
    ],
  },
  {
    stripeId: 'enterprise',
    copy: [
      'For big agencies and companies',
      'Unlimited apps',
      '10 seats',
      'Real-time stats',
      'Detailed campaign reports',
      'Priority customer support',
      'Conversion funnel report',
      'White label apps',
      'Use your own domain names',
      'Integrations with your favorite CRMs and Email marketing platforms',
      'Automatic AI-driven moderation for content-based contests',
    ],
  },
]

export const receivePlans = plans => {
  const processedPlans = plans.map(plan => {
    const elPlan = _.find(plansDictionary, { stripeId: plan.stripeId })
    return {
      ...plan,
      amount: plan.amount / 100,
      copy: elPlan.copy,
    }
  })
  return {
    type: 'RECEIVE_PLANS',
    payload: processedPlans,
  }
}
