if( typeof require !== 'undefined') XLSX = require('xlsx');
const _ = require('lodash');
const fs = require('fs');

const taskList = XLSX.readFile('_data/Tasks.xlsx');
const taskListSheet = taskList.Sheets['Sheet1'];
const taskListRow = [taskList.Sheets['Sheet1']['!ref'].replace(/[A-Z]/g,' ').split(' ').length - 1];
const taskListRowLength = parseInt(taskList.Sheets['Sheet1']['!ref'].replace(/[A-Z]/g,' ').split(' ')[taskListRow],10);
const tasksMapping = {
  'taskName': 'A',
  'taskLink': 'B',
  'taskStatus': 'C'
};
const getTasksList = (sheet, len) => {
  let task = [];
  for (let i = 2; i <= len; i += 1) {
    if (i === 10) {
      task.push({
        taskName: sheet[tasksMapping.taskName + i].v,
        taskLink: 'toDo',
        taskStatus: sheet[tasksMapping.taskStatus + i].v,
      })
    } else {
      task.push({
        taskName: sheet[tasksMapping.taskName + i].v,
        taskLink: sheet[tasksMapping.taskLink + i].v,
        taskStatus: sheet[tasksMapping.taskStatus + i].v,
      });
    }
  }
  return task;
};
const tasksList = getTasksList(taskListSheet, taskListRowLength);
const tesksListJSON = JSON.stringify(tasksList, 0, 2);
// fs.writeFile('./_data/taskList.json', tesksListJSON, 'utf-8',  () => {
//   console.log('write taskList');
// });
// ######################################################################## 
// Обработка эксель файла ментор-студент и составление рабочего файла
// ######################################################################## 
const mentorStudents = XLSX.readFile('_data/Mentor-students pairs.xlsx');
const mentorStudentsSheetPairs = mentorStudents.Sheets['pairs'];
const mentorStudentsSheetPairsRow = [mentorStudents.Sheets['pairs']['!ref'].replace(/[A-Z]/g,' ').split(' ').length - 1];
const mentorStudentsSheetPairsLength = parseInt(mentorStudents.Sheets['pairs']['!ref'].replace(/[A-Z]/g,' ').split(' ')[mentorStudentsSheetPairsRow],10);
const mentorStudentsSheetMentorGit = mentorStudents.Sheets['second_name-to_github_account'];
const mentorStudentsSheetMentorGitRow = [mentorStudents.Sheets['second_name-to_github_account']['!ref'].replace(/[A-Z]/g,' ').split(' ').length - 1];
const mentorStudentsSheetMentorGitLength = parseInt(mentorStudents.Sheets['second_name-to_github_account']['!ref'].replace(/[A-Z]/g,' ').split(' ')[mentorStudentsSheetMentorGitRow],10);
const mentorStudentsSheetPairsMapping = {
  'mentorName': 'A',
  'studentGitName': 'B',
};
const mentorStudentsSheetMentorGitMapping = {
  'firstMentorName': 'A',
  'secondMentorName': 'B',
  'countStudent': 'D',
  'mentorGitName': 'E',
};
const getMentorList = (sheet, len) => {
  const list = [];
  for (let i = 2; i <= len; i += 1) {
    if (mentorStudentsSheetMentorGit[`A${i}`] !== undefined && mentorStudentsSheetMentorGit[`D${i}`].v !== 0) {
      list.push({
        mentorName: `${sheet[mentorStudentsSheetMentorGitMapping.firstMentorName + i].v} ${sheet[mentorStudentsSheetMentorGitMapping.secondMentorName + i].v}`,
        countStudent: sheet[mentorStudentsSheetMentorGitMapping.countStudent + i].v,
        mentorGitName: sheet[mentorStudentsSheetMentorGitMapping.mentorGitName + i].v,
        studentsList: {},
      })
    }
  }
  return list;
};
let mentorData = getMentorList(mentorStudentsSheetMentorGit, mentorStudentsSheetMentorGitLength);
const getMentorStudentList = (sheet, len) => {
  for (let i = 0; i < mentorData.length; i += 1) {
    for (let j = 2; j <= len; j += 1) {
      if (mentorStudentsSheetPairs[`A${j}`] !== undefined) {
        if (mentorData[i].mentorName === sheet[mentorStudentsSheetPairsMapping.mentorName + j].v) {
          mentorData[i].studentsList[sheet[mentorStudentsSheetPairsMapping.studentGitName + j].v] = {};
        }
      }
    }
  }
};
getMentorStudentList(mentorStudentsSheetPairs, mentorStudentsSheetPairsLength);
const mentorScore = XLSX.readFile('_data/mentor score.xlsx');
const mentorScoreSheet = mentorScore.Sheets['Form Responses 1'];
const mentorScoreSheetRow = [mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g,' ').split(' ').length - 1];
const mentorScoreSheetLength = parseInt(mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g,' ').split(' ')[mentorScoreSheetRow],10);
const getStudentTaskInfo = (sheet, len) => {
  for (let i = 0; i < mentorData.length; i += 1) {
    let keys = _.keys(mentorData[i].studentsList);
    for (let j = 0; j < keys.length; j += 1) {
      for (let k = 2; k < len; k += 1) {
        let colStudName = sheet[`C${k}`].v.replace(/[^-0-9a-zA-Z]/gim,' ').trim().split(' ');
        if (keys[j] === colStudName[colStudName.length - 1].toLowerCase()) {
          mentorData[i].studentsList[keys[j]]['gitLink'] = sheet[`C${k}`].v;
          mentorData[i].studentsList[keys[j]][sheet[`D${k}`].v] = 'check';
        }
      }
    }
  }
}
getStudentTaskInfo(mentorScoreSheet, mentorScoreSheetLength)
// #############################################################################################
// Создание общего файла
// #############################################################################################

let fullJSON = [];
fullJSON.push(tasksList)
fullJSON.push(mentorData);
const outDataJSON = JSON.stringify(fullJSON, 0, 2);
fs.writeFile('./data.json', outDataJSON, 'utf-8',  () => {
  console.log('write fullJSON');
});
