import React from 'react';
import { connect }  from 'react-redux';
import ChatApp from '../ChatApp/ChatApp';
import UserLogin from '../UserLogin/UserLogin';

class App extends React.Component {
  render() {
    if (this.props.authenticated) {
      return <ChatApp />;
    }

    return <UserLogin />
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
