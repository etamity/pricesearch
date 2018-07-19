import React from 'react';
import ReactDOM from 'react-dom';
import PriceChart from './PriceChart';

describe('<PriceChart> Start Component Test', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PriceChart />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders chart data without crashing', () => {
        const div = document.createElement('div');
        const data = {
            'January': 20, 
            'February': 100, 
            'March': 50, 
            'April': 30, 
            'May': 52, 
            'June': 55, 
            'July': 10
        };
        ReactDOM.render(<PriceChart data={data} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})