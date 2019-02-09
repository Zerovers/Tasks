const XLSX = require('xlsx');

const taskList = XLSX.readFile('_data/Tasks.xlsx');
const taskListRow = [taskList.Sheets.Sheet1['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];

const mentorStudents = XLSX.readFile('_data/Mentor-students pairs.xlsx');
const mentorStudentsSheetPairsRow = [mentorStudents.Sheets.pairs['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
const mentorStudentsSheetMentorGitRow = [mentorStudents.Sheets['second_name-to_github_account']['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];

const mentorScore = XLSX.readFile('_data/mentor score.xlsx');
const mentorScoreSheetRow = [mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];

const constants = {
  taskListSheet: taskList.Sheets.Sheet1,
  taskListLength: parseInt(taskList.Sheets.Sheet1['!ref'].replace(/[A-Z]/g, ' ').split(' ')[taskListRow], 10),
  tasksMapping: {
    taskName: 'A',
    taskLink: 'B',
    taskStatus: 'C',
  },
  mentorStudentsSheetPairs: mentorStudents.Sheets.pairs,
  mentorStudentsSheetPairsLength: parseInt(mentorStudents.Sheets.pairs['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorStudentsSheetPairsRow], 10),
  mentorStudentsSheetPairsMapping: {
    mentorName: 'A',
    studentGitName: 'B',
  },
  mentorStudentsSheetMentorGit: mentorStudents.Sheets['second_name-to_github_account'],
  mentorStudentsSheetMentorGitLength: parseInt(mentorStudents.Sheets['second_name-to_github_account']['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorStudentsSheetMentorGitRow], 10),
  mentorStudentsSheetMentorGitMapping: {
    firstMentorName: 'A',
    secondMentorName: 'B',
    countStudent: 'D',
    mentorGitName: 'E',
  },
  mentorScoreSheet: mentorScore.Sheets['Form Responses 1'],
  mentorScoreSheetLength: parseInt(mentorScore.Sheets['Form Responses 1']['!ref'].replace(/[A-Z]/g, ' ').split(' ')[mentorScoreSheetRow], 10),
};

module.exports = Object.freeze(constants);
