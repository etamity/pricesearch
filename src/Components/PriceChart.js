
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const PriceChart = (props) => {
    const options = {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false
      }
    const line = {
        labels: (props.data && Object.keys(props.data)) || [],
        datasets: [
          {
            label: 'Price Line Chart',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: (props.data && Object.values(props.data)) || [],
          },
        ],
      };
      const bar = {
        labels: (props.data && Object.keys(props.data)) || [],
        datasets: [
          {
            label: 'Price Bar Chart',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: (props.data && Object.values(props.data)) || [],
          },
        ],
      };
      
      const chart = props.type === 'line' ? <Line data={line} options={options} /> : <Bar data={bar} options={options} />;
    return <div className="chart-wrapper">
      {chart}
  </div>
};

export default PriceChart;
