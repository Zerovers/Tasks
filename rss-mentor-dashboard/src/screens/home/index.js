import './index.css';
import React from 'react';
import { render } from 'react-dom';
import Autocomplete from  'react-autocomplete';
import { getStates, matchStateToTerm, sortStates } from '../../utils/utility';
import Table from '../../components/table';

const _ = require('lodash');

class DashBoard extends React.Component {
  state = {
    inputValue: localStorage.getItem('mentorName'),
    find: localStorage.getItem('find'),
  }

  selectMentor = (mentorName) => {
    localStorage.setItem('mentorName', mentorName);
    localStorage.setItem('find', true);
    this.setState({ inputValue: mentorName, find: 'true'})
  }

  render() {
    let table = null;
    if (this.state.find === 'true') {
      table = <Table mentorName={this.state.inputValue}/>
    }
    return(
      <>
        <Autocomplete
          value={this.state.inputValue}
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={getStates()}
          getItemValue={(item) => item.name}
          shouldItemRender={matchStateToTerm}
          sortItems={sortStates}
          onChange={(event, inputValue) => this.setState({ inputValue, find: '' })}
          onSelect={inputValue => { this.setState({ inputValue }); this.selectMentor(inputValue); }}
          renderMenu={children => (
            <div className="menu">
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.count}
            >{item.name}</div>
          )}
        />
      {table}
      </>
    )
  }
}
render(<DashBoard />, document.querySelector('.app-root'));
