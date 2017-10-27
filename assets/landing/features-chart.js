import $ from 'jquery'
// import Chart from 'chart.js'
import Highcharts from 'highcharts'

const featuresPageChart = id => {
	const dataOne = [0, 20, 25, 28, 35, 40, 45, 55, 75, 100]
	const dataTwo = [0, 12, 18, 22, 22, 25, 25, 35, 45, 55]
	const dataThree = [0, 5, 8, 9, 12, 16, 18, 15, 25, 30]

	let labels = []
	dataOne.map(data => labels.push(''))
	var options = {
		responsive: true,
		showScale: false,
		scaleShowLabels: false,
		showTooltips: false,
		bezierCurve: false,
		pointDotRadius: 5,
		pointDotStrokeWidth: 0.5,
		datasetStrokeWidth: 1,
		scaleShowGridLines: false,
	}

	var ctx = document.getElementById(id).getContext('2d')
	ctx.canvas.width = window.innerWidth + 100
	ctx.canvas.height = 450

	var gradient1 = ctx.createLinearGradient(0, 0, 0, 400)
	gradient1.addColorStop(0, 'rgba(32,90,117,1)')
	gradient1.addColorStop(1, 'rgba(57,48,99,1)')

	var gradient2 = ctx.createLinearGradient(0, 0, 0, 400)
	gradient2.addColorStop(0, 'rgba(133,95,200,1)')
	gradient2.addColorStop(1, 'rgba(57,50,100,1)')

	var gradient3 = ctx.createLinearGradient(0, 0, 0, 400)
	gradient3.addColorStop(0, 'rgba(151,120,221,1)')
	gradient3.addColorStop(1, 'rgba(100,74,174,1)')

	// var myNewChart = new Chart(ctx).Line({
	// var myNewChart = new Highcharts.Chart(ctx).Line({
	var myNewChart = new Highcharts.Chart(id).Line(
		{
			// var myNewChart = new Chart(ctx)
			// var myNewChart = myNewChart.Line({
			// var myNewChart = new Highcharts.Chart(ctx, {
			type: 'line',
			labels: labels,
			datasets: [
				{
					fillColor: gradient1,
					strokeColor: '#fff',
					pointColor: 'transparent',
					data: dataOne,
				},
				{
					fillColor: gradient2,
					strokeColor: '#fff',
					pointColor: 'transparent',
					data: dataTwo,
				},
				{
					fillColor: gradient3,
					strokeColor: '#fff',
					pointColor: 'transparent',
					data: dataThree,
				},
			],
		},
		options
	)

	$(`#${id}`).width(window.innerWidth + 50)
}

export default featuresPageChart
