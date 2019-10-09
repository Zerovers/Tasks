import { connect } from 'react-redux';
import Task from '../components/Task';

const mapStateToProps = ({ auth: { authStatus, admin } }) => ({
  authStatus,
  admin
});

export default connect(
  mapStateToProps,
  null
)(Task);
