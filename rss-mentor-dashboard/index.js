const XLSX = require('xlsx');
const _ = require('lodash');
const fs = require('fs');


const taskList = XLSX.readFile('_data/Tasks.xlsx');
const taskListSheet = taskList.Sheets.Sheet1;
const taskListRow = [taskListSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
const taskListRowLength = parseInt(taskListSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[taskListRow], 10);
const tasksMapping = {
  taskName: 'A',
  taskLink: 'B',
  taskStatus: 'C',
};
const getTasksList = (sheet, len, map) => {
  const task = [];
  for (let i = 2; i <= len; i += 1) {
    if (sheet[`A${i}`] !== undefined) {
      if (i === len) {
        task.push({
          taskName: sheet[map.taskName + i].v,
          taskLink: 'toDo',
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

const mentorStudents = XLSX.readFile('_data/Mentor-students pairs.xlsx');

const mentorStudentsSheetPairs = mentorStudents.Sheets.pairs;
const mentorStudentsSheetPairsRow = [mentorStudents.Sheets.pairs['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
const mentorStudentsSheetPairsLength = parseInt(mentorStudents.Sheets.pairs['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorStudentsSheetPairsRow], 10);

const mentorStudentsSheetMentorGit = mentorStudents.Sheets['second_name-to_github_account'];
const mentorStudentsSheetMentorGitRow = [mentorStudentsSheetMentorGit['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
const mentorStudentsSheetMentorGitLength = parseInt(mentorStudentsSheetMentorGit['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorStudentsSheetMentorGitRow], 10);
const mentorStudentsSheetPairsMapping = {
  mentorName: 'A',
  studentGitName: 'B',
};
const mentorStudentsSheetMentorGitMapping = {
  firstMentorName: 'A',
  secondMentorName: 'B',
  countStudent: 'D',
  mentorGitName: 'E',
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
const mentorScore = XLSX.readFile('_data/mentor score.xlsx');
const mentorScoreSheet = mentorScore.Sheets['Form Responses 1'];
const mentorScoreSheetRow = [mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
const mentorScoreSheetLength = parseInt(mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorScoreSheetRow], 10);

const updateStudentList = (sheet, len, data) => {
  const changeData = data;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 2; j < len; j += 1) {
      const mentorGitNameSheet = sheet[`B${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ')[sheet[`B${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ').length - 1];
      const studentList = _.keys(data[i].studentsList);
      const colStudName = sheet[`C${j}`].v.replace(/[^-0-9a-zA-Z]/gim, ' ').trim().split(' ');
      const targetStudent = colStudName[colStudName.length - 1].replace(/-2018Q3/, '').toLowerCase();
      if (data[i].mentorGitName === mentorGitNameSheet
        && studentList.indexOf(targetStudent) === -1) {
        changeData[i].studentsList[targetStudent] = {};
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
let tasksList = getTasksList(taskListSheet, taskListRowLength, tasksMapping);
tasksList = updateTasksList(mentorScoreSheet, mentorScoreSheetLength, tasksList);
let mentorData = getMentorList(
  mentorStudentsSheetMentorGit,
  mentorStudentsSheetMentorGitLength,
  mentorStudentsSheetMentorGitMapping,
);
mentorData = getMentorStudentList(
  mentorStudentsSheetPairs,
  mentorStudentsSheetPairsLength,
  mentorStudentsSheetPairsMapping,
  mentorData,
);
mentorData = updateStudentList(mentorScoreSheet, mentorScoreSheetLength, mentorData);
mentorData = getStudentTaskInfo(mentorScoreSheet, mentorScoreSheetLength, mentorData);
// #############################################################################################
// Создание общего файла
// #############################################################################################
const fullJSON = [];
fullJSON.push(tasksList);
fullJSON.push(mentorData);
const outDataJSON = JSON.stringify(fullJSON, 0, 2);
fs.writeFile('./data.json', outDataJSON, 'utf-8', () => {
  console.log('write fullJSON');
});
module.exports.getTasksList = getTasksList;
module.exports.getMentorList = getMentorList;
module.exports.getMentorStudentList = getMentorStudentList;
module.exports.getStudentTaskInfo = getStudentTaskInfo;
module.exports.updateTasksList = updateTasksList;
module.exports.updateStudentList = updateStudentList;
