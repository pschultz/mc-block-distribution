$ ->
  levels = []
  levels.push i for i in [0...128]

  interestingDataValues = [56, 21]

  chartConfig =
    chart:
      renderTo: 'container'
    xAxis:
      categories: levels

    plotOptions:
      series:
        animation: false
    series: [
    ]
    xAxis: title: text: 'foobar'

  for dataValue, countPerBlock of window.r
    isInteresting = _.find interestingDataValues, (v) -> `v==dataValue`
    continue unless isInteresting?
    
    c = []
    for level, countPerLevel of countPerBlock
        c.push countPerLevel / (256*768)

    chartConfig.series.push
      data: c
      name: window.blocks[dataValue]

  console.log window.blocks
  new Highcharts.Chart chartConfig
