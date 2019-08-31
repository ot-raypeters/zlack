import React from 'react';
import { connect }  from 'react-redux';
import UserLogin from '../UserLogin/UserLogin';
import Chat from '../Chat/Chat';

class App extends React.Component {
  render() {
    if (!this.props.authenticated) {
      return <UserLogin />
    }

    return <Chat />;
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
