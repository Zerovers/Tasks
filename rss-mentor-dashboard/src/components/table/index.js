import './index.css';
import React from 'react';
import data from '../../../data.json';

const _ = require('lodash');

export default class Table extends React.Component {
  getMentorData = () => _.find(data.mentorStudents, { mentorGitName: this.props.mentorName })

  getTableHead = () => _.keys(this.getMentorData().studentsList)
    .map(element => (
      <th style={{ background: '#4095bf' }} key={element}>
        <a href={`https://github.com/${element}`}>{element}</a>
      </th>
    ));

  getCols = taskInfo => _.keys(this.getMentorData().studentsList).map((e) => {
    const tdStyle = { background: '' };
    switch (taskInfo.taskStatus) {
      case 'ToDo':
        tdStyle.background = '#7a7979';
        break;
      case 'In Progress':
        tdStyle.background = '#ecce6c';
        break;
      case 'Checking':
        tdStyle.background = '#f06d6d';
        break;
      default:
        tdStyle.background = '#721d1d';
    }
    if (_.forIn(this.getMentorData().studentsList[e][taskInfo.taskName] === 'check')) {
      tdStyle.background = '#2db91a';
    }

    return <td key={e} style={tdStyle} />;
  })

  getTableBody = () => data.tasks.map((element) => {
    const tdStyle = { background: '' };
    switch (element.taskStatus) {
      case 'Checked':
        tdStyle.background = '#2db91a';
        break;
      case 'In Progress':
        tdStyle.background = '#ecce6c';
        break;
      case 'Checking':
        tdStyle.background = '#f06d6d';
        break;
      default:
    }
    return (
      <tr key={element.taskName}>
        <td style={tdStyle}>{<a href={element.taskLink}>{element.taskName}</a>}</td>
        {this.getCols(element)}
      </tr>
    );
  })

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th />
            {this.getTableHead()}
          </tr>
        </thead>
        <tbody>
          {this.getTableBody()}
        </tbody>
      </table>
    );
  }
}
