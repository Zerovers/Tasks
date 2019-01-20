import './index.css';
import React from 'react';
import data from '../../../data.json'

const _ = require('lodash');

export default class Table extends React.Component {
  getMentorData = () => {
    return _.find(data[1], {'mentorGitName': this.props.mentorName })
  }

   getTableHead = () => {
    return _.keys(this.getMentorData().studentsList).map((element, index) => {
      return <th key={index}><a href={'https://github.com/'+(element)}>{element}</a></th>
    });
  }

  getCols = (taskInfo) => {
    return _.keys(this.getMentorData().studentsList).map((e, index) => {
      let tdStyle = { background: ''};
        if (_.forIn(this.getMentorData().studentsList[e][taskInfo.taskName] === 'check')) {
          tdStyle.background = '#2db91a';
        } else if (taskInfo.taskStatus === 'ToDo') {
          tdStyle.background = '#7a7979';
        } else if (taskInfo.taskStatus === 'In Progress') {
          tdStyle.background = '#ecce6c';
        } else {
          tdStyle.background = '#721d1d';
        }
      return <td key={index} style={tdStyle}></td>
    })
  }

  getTableBody = () => {
    return data[0].map((element, index) => {
      let tdStyle = { background: '' };
      if (element.taskStatus === 'Checked') {
        tdStyle.background = '#2db91a';
      }
      if (element.taskLink === 'toDo') {
        return (
          <tr key={index}><td>{element.taskName}</td>
            {this.getCols(element)}
          </tr>
        )
      }
      return (
        <tr key={index}>
          <td style={tdStyle}>{<a href={element.taskLink}>{element.taskName}</a>}</td>
          {this.getCols(element)}
        </tr>
      )
    })
  }

  render() {
    return (
      <table>
      <thead>
        <tr><th></th>
        {this.getTableHead()}
        </tr>
      </thead>
        <tbody>
          {this.getTableBody()}
      </tbody>
      </table>
    )
  }
}