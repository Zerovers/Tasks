const XLSX = require('xlsx');

const taskList = XLSX.readFile('_data/Tasks.xlsx');
const mentorStudents = XLSX.readFile('_data/Mentor-students pairs.xlsx');
const mentorScore = XLSX.readFile('_data/mentor score.xlsx');

const constants = {
  taskListSheet: taskList.Sheets.Sheet1,
  taskListLength: XLSX.utils.decode_range(taskList.Sheets.Sheet1['!ref']).e.r + 1,
  tasksMapping: {
    taskName: 'A',
    taskLink: 'B',
    taskStatus: 'C',
  },
  mentorStudentsSheetMentorGit: mentorStudents.Sheets['second_name-to_github_account'],
  mentorStudentsSheetMentorGitLength: XLSX.utils.decode_range(mentorStudents.Sheets['second_name-to_github_account']['!ref']).e.r + 1,
  mentorStudentsSheetMentorGitMapping: {
    mentorName: {
      firstMentorName: 'A',
      secondMentorName: 'B',
    },
    countStudent: 'D',
    mentorGitName: 'E',
  },
  mentorScoreSheet: mentorScore.Sheets['Form Responses 1'],
  mentorScoreSheetLength: XLSX.utils.decode_range(mentorScore.Sheets['Form Responses 1']['!ref']).e.r + 1,
  mentorStudentsSheetPairs: mentorStudents.Sheets.pairs,
  mentorStudentsSheetPairsLength: XLSX.utils.decode_range(mentorStudents.Sheets.pairs['!ref']).e.r + 1,
  mentorStudentsSheetPairsMapping: {
    mentorName: 'A',
    studentGitName: 'B',
  },
};

module.exports = Object.freeze(constants);
