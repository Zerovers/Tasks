const _ = require('lodash');
const fs = require('fs');
const constants = require('./config');

const getTasksList = (sheet, len, map) => {
  const task = [];
  for (let i = 2; i <= len; i += 1) {
    if (sheet[`A${i}`] !== undefined) {
      const obj = {};
      _.keys(map).forEach((e) => {
        if (sheet[map[e] + i] !== undefined) {
          if (sheet[map[e] + i] === undefined) {
            obj[e] = '';
          } else {
            obj[e] = sheet[map[e] + i].v.replace(/ -/g, '').trim().replace(/CodeJam/g, 'Code Jam');
          }
        }
      });
      task.push(obj);
    }
  }
  return task;
};
const getMentorList = (sheet, len, map) => {
  const list = [];
  const mapping = map;
  for (let i = 2; i <= len; i += 1) {
    if (sheet[`A${i}`] !== undefined && sheet[`D${i}`].v !== 0) {
      const obj = {};
      let string = '';
      _.keys(mapping).forEach((e) => {
        if (_.has(map[e], 'firstMentorName')) {
          _.keys(map[e]).forEach((value) => {
            string += `${sheet[map[e][value] + i].v} `;
          });
          obj[e] = string.trim();
        } else if (typeof sheet[map[e] + i].v !== 'number' && sheet[map[e] + i].v.indexOf('http') !== -1) {
          obj[e] = sheet[map[e] + i].v.replace(/[/]$/gim, '').replace(/[^/]*[/]/gim, '').trim();
        } else {
          obj[e] = sheet[map[e] + i].v;
        }
      });
      obj.studentsList = {};
      list.push(obj);
    }
  }
  return list;
};
const getMentorStudentList = (sheet, len, map, data) => {
  const changeData = data;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 2; j <= len; j += 1) {
      if (sheet[`A${j}`] !== undefined) {
        if (data[i].mentorName === sheet[map.mentorName + j].v) {
          changeData[i].studentsList[sheet[map.studentGitName + j].v] = {};
        }
      }
    }
  }
  return changeData;
};
const updateStudentList = (sheet, len, data, sheetStud, sheetStudLen) => {
  const studentsListing = [];
  for (let k = 2; k < sheetStudLen; k += 1) {
    if (sheetStud[`B${k}`] !== undefined) {
      studentsListing.push(sheetStud[`B${k}`].v);
    }
  }
  const changeData = data;
  for (let i = 0; i < changeData.length; i += 1) {
    for (let j = 2; j < len; j += 1) {
      const mentorGitNameSheet = sheet[`B${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ')[sheet[`B${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ').length - 1];
      const studentList = _.keys(data[i].studentsList);
      const colStudName = sheet[`C${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ');
      const targetStudent = colStudName[colStudName.length - 1].replace(/-2018Q3/, '').toLowerCase();
      if (data[i].mentorGitName === mentorGitNameSheet
        && studentList.indexOf(targetStudent) === -1) {
        if (_.indexOf(studentsListing, targetStudent) === -1) {
          changeData[i].studentsList[targetStudent] = {};
        }
      }
    }
  }
  return changeData;
};
const getStudentTaskInfo = (sheet, len, data) => {
  const changeData = data;
  for (let i = 0; i < data.length; i += 1) {
    const keys = _.keys(data[i].studentsList);
    for (let j = 0; j < keys.length; j += 1) {
      for (let k = 2; k < len; k += 1) {
        const colStudName = sheet[`C${k}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ');
        if (keys[j] === colStudName[colStudName.length - 1].replace(/-2018Q3/, '').toLowerCase()) {
          changeData[i].studentsList[keys[j]][sheet[`D${k}`].v] = 'check';
        }
      }
    }
  }
  return changeData;
};
const updateTasksList = (sheet, len, data) => {
  const dataList = [];
  data.map(e => dataList.push(e.taskName));
  for (let i = 0; i < dataList.length; i += 1) {
    for (let j = 2; j < len; j += 1) {
      if (sheet[`D${j}`] !== undefined) {
        if (dataList.indexOf(sheet[`D${j}`].v) === -1) {
          const last = data.pop();
          data.push({
            taskName: sheet[`D${j}`].v,
            taskLink: '',
            taskStatus: 'Checking',
          });
          data.push(last);
          return data;
        }
      }
    }
  }
};
let tasksList = getTasksList(
  constants.taskListSheet,
  constants.taskListLength,
  constants.tasksMapping,
);
tasksList = updateTasksList(
  constants.mentorScoreSheet,
  constants.mentorScoreSheetLength,
  tasksList,
);
let mentorData = getMentorList(
  constants.mentorStudentsSheetMentorGit,
  constants.mentorStudentsSheetMentorGitLength,
  constants.mentorStudentsSheetMentorGitMapping,
);
mentorData = getMentorStudentList(
  constants.mentorStudentsSheetPairs,
  constants.mentorStudentsSheetPairsLength,
  constants.mentorStudentsSheetPairsMapping,
  mentorData,
);
mentorData = updateStudentList(
  constants.mentorScoreSheet,
  constants.mentorScoreSheetLength,
  mentorData,
  constants.mentorStudentsSheetPairs,
  constants.mentorStudentsSheetPairsLength,
);
mentorData = getStudentTaskInfo(
  constants.mentorScoreSheet,
  constants.mentorScoreSheetLength,
  mentorData,
);
// #############################################################################################
// Создание общего файла
// #############################################################################################
const createJSON = (obj) => {
  const fullJSON = {
    tasks: obj.tasksList,
    mentorStudents: obj.mentorData,
  };
  const outDataJSON = JSON.stringify(fullJSON, 0, 2);
  fs.writeFile('./data.json', outDataJSON, 'utf-8', () => {
    console.log('write fullJSON');
  });
};
createJSON({ tasksList, mentorData });

module.exports.getTasksList = getTasksList;
module.exports.getMentorList = getMentorList;
module.exports.getMentorStudentList = getMentorStudentList;
module.exports.getStudentTaskInfo = getStudentTaskInfo;
module.exports.updateTasksList = updateTasksList;
module.exports.updateStudentList = updateStudentList;
