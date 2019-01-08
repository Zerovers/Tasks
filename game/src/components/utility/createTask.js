import TasksData from './TaskData';
import getMathСalculation from './MathValue';

export default function createTask(name) {
  let task;
  const mathData = TasksData.createMathData();
  const mathResult = getMathСalculation(mathData);
  const comparisonData = TasksData.createComparisonData();
  const sortData = TasksData.createSortData();
  const translateData = TasksData.createTranslateData();
  const sequenceData = TasksData.createSequenceData();
  const pazzleData = TasksData.createPazzleData();
  const speechData = TasksData.createSpeechData();
  const grammaticData = TasksData.createGrammaticData();
  const logicData = TasksData.createLogicData();
  const deleteWordData = TasksData.createDeleteWordData();
  switch (name) {
    case 'mathTask':
      task = ({ mathData, mathResult });
      break;
    case 'comparisonTask':
      task = { comparisonData };
      break;
    case 'sortTask':
      task = { sortData };
      break;
    case 'translateTask':
      task = translateData;
      break;
    case 'sequenceTask':
      task = sequenceData;
      break;
    case 'pazzleTask':
      task = pazzleData;
      break;
    case 'speechTask':
      task = speechData;
      break;
    case 'grammaticTask':
      task = grammaticData;
      break;
    case 'logicTask':
      task = logicData;
      break;
    case 'deleteWordTask':
      task = deleteWordData;
      break;
    default:
  }
  return task;
}
