import './index.css';
import data from '../../../data.json';
import React from 'react';
import { render } from 'react-dom';

class DashBoard extends React.Component {
  render() {
    console.log(data);
    return(
      <>
      <div>
        <h1>Work</h1>
      </div>
      </>
    )
  }
}

render(<DashBoard />, document.querySelector('.app-root'));
