import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import './UserLogin.css';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  login(username) {
    return this.props.login({ username });
  }

  loginOnEnter(ev) {
    if (ev.key === 'Enter') {
      this.login(ev.target.value);
      ev.preventDefault();
      ev.target.value = '';
    }
  }

  render() {
    return (
      <div className="user-login fullscreen">
        <div className="user-login__form">
          <label
            className="label noselect"
            htmlFor="username-input">Enter your username</label>

          <input
            ref={this.inputRef}
            type="text"
            autoFocus={true}
            className="input"
            id="username-input"
            defaultValue="Anonymous"
            onKeyUp={(ev) => this.loginOnEnter(ev)} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { login };
export default connect(null, mapDispatchToProps)(UserLogin);