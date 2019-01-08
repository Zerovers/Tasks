import MathTask from '../tasks/mathematic';
import ComparisonTask from '../tasks/comparison';
import SortTask from '../tasks/sort';
import TranslateTask from '../tasks/translate';
import SequenceTask from '../tasks/sequence';
import PazzleTask from '../tasks/pazzle';
import SpeechTask from '../tasks/speech';
import GrammaticTask from '../tasks/grammatic';
import LogicTask from '../tasks/logic';
import DeleteWordTask from '../tasks/deleteWord';
import React from 'react';
import createTask from './createTask'



export default function selectTasks(taskName, props) {
  const mathData = createTask('mathTask');
  const comparisonData = createTask('comparisonTask');
  const sortData = createTask('sortTask');
  const translateData = createTask('translateTask');
  const sequenceData = createTask('sequenceTask');
  const pazzleData = createTask('pazzleTask');
  const speechData = createTask('speechTask');
  const grammaticData = createTask('grammaticTask');
  const logicData = createTask('logicTask');
  const deleteWordData = createTask('deleteWordTask');
  switch(taskName) {
    case 'mathTask':
      return <MathTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={mathData}/>
    case 'comparisonTask':
      return <ComparisonTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={comparisonData}  /> 
    case 'sortTask':
      return <SortTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={sortData}  /> 
    case 'translateTask':
      return <TranslateTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={translateData}  /> 
    case 'sequenceTask':
      return <SequenceTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={sequenceData}  /> 
    case 'pazzleTask':
      return <PazzleTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={pazzleData}  /> 
    case 'speechTask':
      return <SpeechTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={speechData}  /> 
    case 'grammaticTask':
      return <GrammaticTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={grammaticData}/> 
    case 'logicTask':
      return <LogicTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={logicData}/> 
    case 'deleteWordTask':
      return <DeleteWordTask selectAction={props.selectAction} resultBattle={props.resultBattle} taskData={deleteWordData}/> 
    default: 
  }
}