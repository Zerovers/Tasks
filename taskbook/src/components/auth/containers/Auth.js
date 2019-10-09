import { connect } from 'react-redux';
import * as AuthActions from '../actions';
import Auth from '../components/Auth';

const mapStateToProps = ({ auth: { authStatus, admin } }) => ({
  authStatus,
  admin
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(AuthActions.login()),
  logout: () => dispatch(AuthActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
