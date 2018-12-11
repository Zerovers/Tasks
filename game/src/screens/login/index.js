import { sortable } from '../../components/tasks/sort/jquery-ui/jquery-ui.min';
import battles from '../battle'
let _ = require('lodash');

$('#input-login').on('change', (event) => {
  const name = event.target.value;
  battles.render(name)
 });