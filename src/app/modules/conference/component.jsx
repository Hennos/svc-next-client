import React from 'react';
import { connect } from 'react-redux';
import {
  connect as connectWithServer,
} from './actions';
import User from './components/Users';

class ConferenceApp extends React.Component {
  render() {
    this.props.createConnection();

    return (
      <div>
        <User />
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

const mapDispatchToProps = dispatch => ({
  createConnection: () => dispatch(connectWithServer()),
});

export default connect(null, mapDispatchToProps)(ConferenceApp);
