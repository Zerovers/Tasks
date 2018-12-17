import { sortable } from '../../components/tasks/sort/jquery-ui/jquery-ui.min';
import battles from '../battle'
let _ = require('lodash');
import player from '../battle/';
import { resolve } from 'url';

$('#input-login').on('change', async (event) => {
  const name = event.target.value;
  await battles.render(name);
 });

