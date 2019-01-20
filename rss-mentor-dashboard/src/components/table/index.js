/* eslint-disable import/no-extraneous-dependencies */
import './index.css';
import React from 'react';
import data from '../../../data.json';

const _ = require('lodash');

export default class Table extends React.Component {
  getMentorData = () => _.find(data[1], { mentorGitName: this.props.mentorName })

  getTableHead = () => _.keys(this.getMentorData().studentsList).map(element => <th key={element}><a href={`https://github.com/${element}`}>{element}</a></th>)

  getCols = taskInfo => _.keys(this.getMentorData().studentsList).map((e) => {
    const tdStyle = { background: '' };
    if (_.forIn(this.getMentorData().studentsList[e][taskInfo.taskName] === 'check')) {
      tdStyle.background = '#2db91a';
    } else if (taskInfo.taskStatus === 'ToDo') {
      tdStyle.background = '#7a7979';
    } else if (taskInfo.taskStatus === 'In Progress') {
      tdStyle.background = '#ecce6c';
    } else {
      tdStyle.background = '#721d1d';
    }
    return <td key={e} style={tdStyle} />;
  })

  getTableBody = () => data[0].map((element) => {
    const tdStyle = { background: '' };
    if (element.taskStatus === 'Checked') {
      tdStyle.background = '#2db91a';
    }
    if (element.taskLink === 'toDo') {
      return (
        <tr key={element.taskName}>
          <td>{element.taskName}</td>
          {this.getCols(element)}
        </tr>
      );
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
