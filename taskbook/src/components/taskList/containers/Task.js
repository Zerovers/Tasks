import { connect } from 'react-redux';
import Task from '../components/Task';

const mapStateToProps = ({ data, auth: { authStatus, admin } }) => ({
  data: data.data,
  authStatus,
  admin
});

export default connect(
  mapStateToProps,
  null
)(Task);
