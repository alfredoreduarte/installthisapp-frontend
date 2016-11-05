import _ from 'lodash'

const plansDictionary = [
	{
		stripeId: "basic_development",
		copy: [
			'For solo businesses owners',
			'Up to 5 apps',
			'1 Seat',
		],
	},
	{
		stripeId: "basic_staging",
		copy: [
			'For solo businesses owners',
			'Up to 5 apps',
			'1 Seat',
		],
	},
	{
		stripeId: "agency_development",
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
		stripeId: "enterprise_development",
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
			'Automatic AI-driven moderation for content-based contests'
		],
	}
]

export const receivePlans = plans => {
	const processedPlans = plans.map(plan => {
		console.log('el plan', plan)
		const elPlan = _.find(plansDictionary, {'stripeId': plan.stripeId})
		const amount = parseInt(plan.amount) / 100
		return {
			...plan,
			copy: 'elPlan.copy',
			amount,
		}
	})
	return {
		type: 'RECEIVE_PLANS',
		payload: processedPlans
	}
}