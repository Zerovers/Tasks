const _ = require('lodash');
const fs = require('fs');
const constants = require('./config');

const getTasksList = (sheet, len, map) => {
  const task = [];
  for (let i = 2; i <= len; i += 1) {
    if (sheet[`A${i}`] !== undefined && sheet[`C${i}`] !== undefined) {
      if (sheet[`C${i}`].v === 'ToDo') {
        let link;
        if (sheet[map.taskLink + i] === undefined) {
          link = '';
        } else {
          link = sheet[map.taskLink + i].v;
        }
        task.push({
          taskName: sheet[map.taskName + i].v,
          taskLink: link,
          taskStatus: sheet[map.taskStatus + i].v,
        });
      } else {
        task.push({
          taskName: sheet[map.taskName + i].v.replace(/-/g, ' ').trim().replace(/CodeJam/g, 'Code Jam'),
          taskLink: sheet[map.taskLink + i].v,
          taskStatus: sheet[map.taskStatus + i].v,
        });
      }
    }
  }
  return task;
};
const getMentorList = (sheet, len, mapping) => {
  const list = [];
  for (let i = 2; i <= len; i += 1) {
    if (sheet[`A${i}`] !== undefined && sheet[`D${i}`].v !== 0) {
      const mentorGit = sheet[mapping.mentorGitName + i].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ');
      list.push({
        mentorName: `${sheet[mapping.firstMentorName + i].v} ${sheet[mapping.secondMentorName + i].v}`,
        countStudent: sheet[mapping.countStudent + i].v,
        mentorGitName: mentorGit[mentorGit.length - 1],
        studentsList: {},
      });
    }
  }
  return list;
};
const getMentorStudentList = (sheet, len, mapping, data) => {
  const changeData = data;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 2; j <= len; j += 1) {
      if (sheet[`A${j}`] !== undefined) {
        if (data[i].mentorName === sheet[mapping.mentorName + j].v) {
          changeData[i].studentsList[sheet[mapping.studentGitName + j].v] = {};
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
