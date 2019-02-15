const XLSX = require('xlsx');

const {
  getTasksList,
  getMentorList,
  getMentorStudentList,
  getStudentTaskInfo,
  updateTasksList,
  updateStudentList,
} = require('../lib/createJSON/index');

test('test create data with Tasks name, link, status', () => {
  const taskList = XLSX.readFile('src/test/Tasks_test.xlsx');
  const taskListSheet = taskList.Sheets.Sheet1;
  const taskListRow = [taskList.Sheets.Sheet1['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const taskListRowLength = parseInt(taskList.Sheets.Sheet1['!ref'].replace(/[A-Z]/g, ' ').split(' ')[taskListRow], 10);
  const tasksMapping = {
    taskName: 'A',
    taskLink: 'B',
    taskStatus: 'C',
  };
  expect(getTasksList(taskListSheet, taskListRowLength, tasksMapping)).toEqual([{
    taskName: 'Code Jam "CV"',
    taskLink: 'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-cv.md',
    taskStatus: 'Checked',
  }]);
});
test('test create data with Mentor name, gitName, countStudents', () => {
  const testFile = XLSX.readFile('src/test/Mentor-students pairs_test.xlsx');
  const testFileSheet = testFile.Sheets['second_name-to_github_account'];
  const testFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testFileSheetRow], 10);
  const testFileMapping = {
    mentorName: {
      firstMentorName: 'A',
      secondMentorName: 'B',
    },
    countStudent: 'D',
    mentorGitName: 'E',
  };
  expect(getMentorList(testFileSheet, testFileSheetLength, testFileMapping)).toEqual([{
    mentorName: 'Sergey Maksimuk',
    countStudent: 10,
    mentorGitName: 'maximuk',
    studentsList: {},
  }]);
});
test('test create data with students name', () => {
  const testFile = XLSX.readFile('src/test/Mentor-students pairs_test.xlsx');
  const testFileSheet = testFile.Sheets.pairs;
  const testFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testFileSheetRow], 10);
  const testFileMapping = {
    mentorName: 'A',
    studentGitName: 'B',
  };
  const data = [{
    mentorName: 'Akiaksandr Zahorski',
    countStudent: 3,
    mentorGitName: 'AliaksandrZahorski',
    studentsList: {},
  }];
  expect(getMentorStudentList(testFileSheet, testFileSheetLength, testFileMapping, data)).toEqual([{
    mentorName: 'Akiaksandr Zahorski',
    countStudent: 3,
    mentorGitName: 'AliaksandrZahorski',
    studentsList: {
      grenbork: {},
      bananovblu: {},
      bmvmarc: {},
      taukitianin: {},
      deepenguin: {},
    },
  }]);
});
test('test create data with students task info', () => {
  const testFile = XLSX.readFile('src/test/mentor score_test.xlsx');
  const testFileSheet = testFile.Sheets['Form Responses 1'];
  const testFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testFileSheetRow], 10);
  const data = [{
    mentorName: 'Akiaksandr Zahorski',
    countStudent: 3,
    mentorGitName: 'AliaksandrZahorski',
    studentsList: {
      grenbork: {},
      bananovblu: {},
      bmvmarc: {},
      taukitianin: {},
      deepenguin: {},
    },
  }];
  expect(getStudentTaskInfo(testFileSheet, testFileSheetLength, data)).toEqual([{
    mentorName: 'Akiaksandr Zahorski',
    countStudent: 3,
    mentorGitName: 'AliaksandrZahorski',
    studentsList: {
      grenbork: {},
      bananovblu: {},
      bmvmarc: {
        'Markup #1': 'check',
        'Code Jam "CoreJS"': 'check',
        'Code Jam "CV"': 'check',
        'Code Jam "DOM, DOM Events"': 'check',
        YouTube: 'check',
        'Code Jam "Scoreboard"': 'check',
      },
      taukitianin: {},
      deepenguin: {},
    },
  }]);
});
test('test update data with lost task', () => {
  const testFile = XLSX.readFile('src/test/mentor score_test.xlsx');
  const testFileSheet = testFile.Sheets['Form Responses 1'];
  const testFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testFileSheetRow], 10);
  const data = [{
    taskName: 'Code Jam "CV"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-cv.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Code Jam "CoreJS"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-corejs.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Code Jam "DOM, DOM Events"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-notification.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Markup #1',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/markup-2018q3.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'RS Activist',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/rs-school-activist.md',
    taskStatus: 'In Progress',
  },
  {
    taskName: 'YouTube',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/youtube.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'Code Jam "Scoreboard"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-scoreboard.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'Game',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/game.md',
    taskStatus: 'In Progress',
  },
  { taskName: 'Course work', taskLink: 'toDo', taskStatus: 'ToDo' },
  ];
  expect(updateTasksList(testFileSheet, testFileSheetLength, data)).toEqual([{
    taskName: 'Code Jam "CV"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-cv.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Code Jam "CoreJS"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-corejs.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Code Jam "DOM, DOM Events"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-notification.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Markup #1',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/markup-2018q3.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'RS Activist',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/rs-school-activist.md',
    taskStatus: 'In Progress',
  },
  {
    taskName: 'YouTube',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/youtube.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'Code Jam "Scoreboard"',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-scoreboard.md',
    taskStatus: 'Checking',
  },
  {
    taskName: 'Game',
    taskLink:
      'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/game.md',
    taskStatus: 'In Progress',
  },
  {
    taskName: 'Presentation',
    taskLink: '',
    taskStatus: 'Checking',
  },
  { taskName: 'Course work', taskLink: 'toDo', taskStatus: 'ToDo' }]);
});
test('test update data with lost students', () => {
  const testFile = XLSX.readFile('src/test/mentor score_test.xlsx');
  const testFileSheet = testFile.Sheets['Form Responses 1'];
  const testFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testFileSheetRow], 10);
  const testsFile = XLSX.readFile('src/test/Mentor-students pairs_test.xlsx');
  const testsFileSheet = testsFile.Sheets.pairs;
  const testsFileSheetRow = [testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ').length - 1];
  const testsFileSheetLength = parseInt(testFileSheet['!ref'].replace(/[A-Z]/g, ' ').split(' ')[testsFileSheetRow], 10);
  const data = [{
    mentorName: 'Sergey Maksimuk',
    countStudent: 10,
    mentorGitName: 'maximuk',
    studentsList: {
      'andrei-oksentyk': {},
      wertybsd: {},
      halaveika: {},
      liodama: {},
      'alexey-1991': {},
      'fyr-fyrrr': {},
      redgektor: {},
      alexdejko: {},
      alenashkr: {},
      uniapi: {},
    },
  }];
  expect(updateStudentList(
    testFileSheet,
    testFileSheetLength,
    data, testsFileSheet,
    testsFileSheetLength,
  )).toEqual([{
    mentorName: 'Sergey Maksimuk',
    countStudent: 10,
    mentorGitName: 'maximuk',
    studentsList: {
      'andrei-oksentyk': {},
      wertybsd: {},
      halaveika: {},
      liodama: {},
      'alexey-1991': {},
      'fyr-fyrrr': {},
      redgektor: {},
      alexdejko: {},
      alenashkr: {},
      uniapi: {},
      remziq: {},
      temons: {},
      sozonikoleg: {},
    },
  }]);
});
