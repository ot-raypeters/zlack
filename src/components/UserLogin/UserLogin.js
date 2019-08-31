import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/user';

class UserLogin extends React.Component {
  login(username) {
    return this.props.login({ username });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.login('bob')}>login</button>
      </div>
    );
  }
}

const mapDispatchToProps = { login };
export default connect(null, mapDispatchToProps)(UserLogin);