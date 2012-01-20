
$(function() {
  var c, chartConfig, countPerBlock, countPerLevel, dataValue, i, interestingDataValues, isInteresting, level, levels, _ref;
  levels = [];
  for (i = 0; i < 128; i++) {
    levels.push(i);
  }
  interestingDataValues = [56, 21];
  chartConfig = {
    chart: {
      renderTo: 'container'
    },
    xAxis: {
      categories: levels
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    series: [],
    xAxis: {
      title: {
        text: 'foobar'
      }
    }
  };
  _ref = window.r;
  for (dataValue in _ref) {
    countPerBlock = _ref[dataValue];
    isInteresting = _.find(interestingDataValues, function(v) {
      return v==dataValue;
    });
    if (isInteresting == null) continue;
    c = [];
    for (level in countPerBlock) {
      countPerLevel = countPerBlock[level];
      c.push(countPerLevel / (256 * 768));
    }
    chartConfig.series.push({
      data: c,
      name: window.blocks[dataValue]
    });
  }
  console.log(window.blocks);
  return new Highcharts.Chart(chartConfig);
});
