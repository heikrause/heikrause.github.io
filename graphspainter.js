var samples = 20;
var speed = 500;
var values = [];
var labels = [];
var charts = [];

values.length = samples;
labels.length = samples;
values.fill(0);
labels.fill(0);

function initialize_graphs() {
  charts.push(new Chart(document.getElementById("heartChart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 3,
        lineTension: 0.75,
        pointRadius: 1 
      }]
    },
    options: {
      responsive: false,
      animation: {
        duration: speed * 1.5,
        easing: 'linear'
      },
      legend: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          ticks: {
            max: 200,
            min: 40
          }
        }]
      }
    }
  }), new Chart(document.getElementById("batteryChart"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      animation: {
        duration: speed * 1.5,
        easing: 'linear'
      },
      legend: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          ticks: {
            max: 200,
            min: 40
          }
        }]
      }
    }
  }));
}


function advance(value) {

  values.push(value);
  values.shift();
  charts.forEach(function(chart) { chart.update(); });

  //setTimeout(function() {
  //  requestAnimationFrame(advance);
  //}, speed);
}


