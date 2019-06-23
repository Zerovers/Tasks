import { connect } from 'react-redux';
import * as CreateTaskActions from '../actions';

import CreateTaskPage from '../components/CreateTaskPage';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createTask: payload => dispatch(CreateTaskActions.createTask(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskPage);
