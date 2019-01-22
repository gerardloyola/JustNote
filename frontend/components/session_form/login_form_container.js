import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, clearSessionErrors} from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'Log In'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);