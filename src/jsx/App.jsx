import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://d3js.org/
import * as d3 from 'd3';

// https://www.chartjs.org/
import Chart from 'chart.js';

let chart, interval;

class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();
    this.chartRef = React.createRef();

    this.state = {
      current_country:'',
      current_idx:0
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {
    clearInterval(interval);
  }
  getData() {
    d3.csv('./data/data - 2020_extra_mortality_transpose.csv').then((data) => {
      
      let keys = Object.keys(data[0]);
      keys.pop();

      this.setState((state, props) => ({
        data:data
      }), () => this.createChart(keys, []));

      this.changeCountry();
    });
  }
  createChart(keys, values) {
    let ctx = this.chartRef.current.getContext('2d');
    chart = new Chart(ctx, {
      data:{
        labels:keys,
        datasets:[{
          backgroundColor:'rgba(27, 64, 152, 0.7)',
          borderColor:'rgba(27, 64, 152, 0.7)',
          data:values,
          label:'',
          fill:false,
          pointRadius:3,
          borderWidth:6,
          type:'line'
        }]
      },
      options:{
        aspectRatio:16/9,
        hover:{
          enabled:false
        },
        legend:{
          display:false
        },
        onHover:(event, chartElement) => {
          // event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        scales:{
          xAxes:[{
            display:true,
            gridLines:{
              display:false
            },
            ticks:{
              autoSkip:false,
              fontColor:'#444',
              fontSize:16,
              fontStyle:'bold',
              maxRotation:0,
              minRotation:0
            },
            stacked:false
          }],
          yAxes:[{
            display:true,
            gridLines:{
              display:true
            },
            ticks:{
              autoSkip:false,
              fontColor:'#444',
              fontSize:16,
              fontStyle:'bold',
              maxRotation:0,
              minRotation:0
            }
          }]
        },
        title:{
          display:false,
        },
        tooltips:{
          enabled:true
        }
      }
    });
  }
  changeCountry() {
    let values = Object.values(this.state.data[this.state.current_idx]);

    chart.data.datasets[0].data = [];
    chart.update();
    let current_country = values.pop();
    this.setState((state, props) => ({
      current_country:current_country
    }));

    let value = parseInt(values.shift());

    chart.options.scales.yAxes[0].ticks.suggestedMax = values.reduce((a, b) => { return Math.max(a, b); }) + 100;
    chart.options.scales.yAxes[0].ticks.suggestedMin = values.reduce((a, b) => { return Math.min(a, b); }) - 100;
            
    interval = setInterval(() => {
      value = parseInt(values.shift())
      if (isNaN(value)) {
        clearInterval(interval);
        if (this.state.current_idx < (this.state.data.length - 1)) {
          setTimeout(() => {
            this.setState((state, props) => ({
              current_idx:state.current_idx + 1
            }), () => this.changeCountry());
          }, 2000);
        }
      }
      else {
        chart.data.datasets[0].data.push(value);
        chart.update();
      }
    }, 150);
  }
  // shouldComponentUpdate(nextProps, nextState) {}
  // static getDerivedStateFromProps(props, state) {}
  // getSnapshotBeforeUpdate(prevProps, prevState) {}
  // static getDerivedStateFromError(error) {}
  // componentDidCatch() {}
  render() {
    return (
      <div className={style.app} ref={this.appRef}>
        <h3>{this.state.current_country}</h3>
        <div className={style.chart_container}>
          <canvas id={style.chart} ref={this.chartRef}></canvas>
        </div>
      </div>
    );
  }
}
export default App;