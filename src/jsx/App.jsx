import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://d3js.org/
import * as d3 from 'd3';

// https://www.chartjs.org/
import Chart from 'chart.js';

let chart, interval;

const countryCodes = {AUS:'Australia',AUT:'Austria',BLR:'Belarus',BEL:'Belgium',BGR:'Bulgaria',CAN:'Canada',CHL:'Chile',CZE:'Czech Republic',DNK:'Denmark',EST:'Estonia',FIN:'Finland',FRATNP:'France',DEUTNP:'Germany',GRC:'Greece',HUN:'Hungary',ISL:'Iceland',IRL:'Ireland',ISR:'Israel',ITA:'Italy',JPN:'Japan',LVA:'Latvia',LTU:'Lithuania',LUX:'Luxembourg',NLD:'Netherlands',NZL_NP:'New Zealand',NOR:'Norway',POL:'Poland',PRT:'Portugal',RUS:'Russia',SVK:'Slovakia',SVN:'Slovenia',ESP:'Spain',SWE:'Sweden',CHE:'Switzerland',TWN:'Taiwan',GBRTENW:'England & Wales',GBR_SCO:'Scotland',USA:'U.S.A.',UKR:'Ukraine'};


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
    Promise.all([
      d3.csv('./data/data_mortality.org - 2020_extra_mortality_cum_transpose.csv'),
      d3.csv('./data/data_mortality.org - 2020_extra_mortality_weekly_transpose.csv'),
    ]).then((data) => {
      let keys = Object.keys(data[0][0]).slice(0, 35);
      keys.pop();

      this.setState((state, props) => ({
        data_cumulative:data[0],
        data_weekly:data[1]
      }), () => this.createChart(keys, [], []));
      this.changeCountry();
    }).catch((err) => {
      if (err) throw err;
    });
  }
  createChart(keys) {
    let ctx = this.chartRef.current.getContext('2d');
    chart = new Chart(ctx, {
      data:{
        labels:keys,
        datasets:[{
          backgroundColor:'rgba(27, 64, 152, 0.7)',
          borderColor:'rgba(27, 64, 152, 0.7)',
          data:[],
          label:'Cumulative',
          fill:false,
          pointRadius:3,
          borderWidth:6,
          type:'line'
        },{
          backgroundColor:'rgba(27, 64, 152, 0.7)',
          borderColor:'rgba(27, 64, 152, 0.7)',
          data:[],
          label:'Weekly',
          borderWidth:0,
          type:'bar'
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
            offset:true,
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
    let values_cumulative = Object.values(this.state.data_cumulative[this.state.current_idx]).filter(item => item);
    let values_weekly = Object.values(this.state.data_weekly[this.state.current_idx]).filter(item => item);

    // Clean chart.
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.update();

    // Remove country name from the array.
    let current_country = values_cumulative.pop();
    values_weekly.pop();

    // Test if country has no data.
    if (values_cumulative[0] == 'undefined') {
      clearInterval(interval);
      if (this.state.current_idx < (this.state.data_cumulative.length - 1)) {
        setTimeout(() => {
          this.setState((state, props) => ({
            current_idx:state.current_idx + 1
          }), () => this.changeCountry());
        }, 0);
      }
    }
    
    // Remove the last week because unreliable.
    values_cumulative.pop();
    values_weekly.pop();

    this.setState((state, props) => ({
      current_country:countryCodes[current_country]
    }));


    // Set minimum and maximum.
    chart.options.scales.yAxes[0].ticks.suggestedMax = parseInt(values_cumulative.reduce((a, b) => { return Math.max(a, b); })) + 500;
    chart.options.scales.yAxes[0].ticks.suggestedMin = parseInt(values_cumulative.reduce((a, b) => { return Math.min(a, b); })) - 500;
    
    let value_cumulative, value_weekly;

    // Set interval to push values for each country.
    interval = setInterval(() => {
      value_cumulative = parseInt(values_cumulative.shift())
      value_weekly = parseInt(values_weekly.shift())

      if (isNaN(value_cumulative)) {
        clearInterval(interval);
        if (this.state.current_idx < (this.state.data_cumulative.length - 1)) {
          setTimeout(() => {
            this.setState((state, props) => ({
              current_idx:state.current_idx + 1
            }), () => this.changeCountry());
          }, 3000);
        }
      }
      else {
        chart.data.datasets[0].data.push(value_cumulative);
        chart.data.datasets[1].data.push(value_weekly);
        chart.update(0);
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