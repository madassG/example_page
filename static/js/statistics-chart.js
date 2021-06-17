var customTooltips = function(tooltipElement) {
  $(this._chart.canvas).css('cursor', 'pointer');

  var positionY = this._chart.canvas.offsetTop;
  var positionX = this._chart.canvas.offsetLeft;

  $('.chartjs-tooltip').css({
    opacity: 0,
  });

  if (!tooltipElement || !tooltipElement.opacity) {
    return;
  }

  if (tooltipElement.dataPoints.length > 0) {
    var label = ["Просмотров", "Подписок"];
    tooltipElement.dataPoints.forEach(function(dataPoint) {
      console.log(label[dataPoint.datasetIndex]);
      var content = [label[dataPoint.datasetIndex], dataPoint.yLabel].join(': ');
      var $tooltip = $('#tooltip-' + dataPoint.datasetIndex);

      $tooltip.html(content);
      $tooltip.css({
        opacity: 1,
        top: positionY + dataPoint.y + 'px',
        left: positionX + dataPoint.x + 'px',
      });
    });
  }
}
var config = {
	type: 'line',
	data: {
		labels: ['07.05.20', '08.05.20', '09.05.20', '10.05.20', '11.05.20', '12.05.20', '13.05.20'],
		datasets: [{
			label: 'Просмотров',
      borderColor: '#36a2eb',
      backgroundColor: '#fff',
      data: [
				52,
				68,
				97,
				67,
				57,
				89,
				67
			],
			fill: false
		},{
			label: 'Подписок',
      borderColor: '#ff6384',
      backgroundColor: '#fff',
      data: [
        37,
				45,
				67,
				41,
				32,
				54,
				34
			],
			fill: false
		},]
	},
	options: {
		responsive: true,
		title: {
			display: false
		},
		tooltips: {
      enabled: false,
      mode: 'index',
      intersect: false,
      custom: customTooltips,
		},
    legend: {
    	display: false
    }
	}
};

Chart.defaults.global.defaultFontFamily = "Gotham Pro";
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = '#717171';

window.onload = function() {
  $.ajax({
    method: 'get',
    url: 'ajax/',
    success: function(data) {
      // var data = {
      //   "07.05.2020": [78, 46],
      //   "08.05.2020": [87, 58],
      //   "09.05.2020": [51, 39],
      //   "10.05.2020": [49, 40],
      //   "11.05.2020": [45, 42],
      //   "12.05.2020": [12, 4],
      //   "13.05.2020": [8, 1],
      // }
      var labels = [];
      var datasets = [[],[]];
      for (date in data) {
        labels.push(date);
        datasets[0].push(data[date][0]);
        datasets[1].push(data[date][1]);
      }
      config.data.labels = labels;
      config.data.datasets[0].data = datasets[0];
      config.data.datasets[1].data = datasets[1];

      var ctx = document.getElementById('statistics-chart').getContext('2d');
      new Chart(ctx, config);
    }
  });
};
