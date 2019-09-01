import React from 'react';
import { connect } from 'react-redux';
import { getSelectedThreadParticipants } from '../../selectors/threads';
import './ThreadParticipants.css';

class ThreadParticipants extends React.Component {
  render() {
    return (
      <ul className="thread-participants noselect">
        <li className="thread-participants__title">PARTICIPANTS</li>
        {this.props.participants.map((user) =>
          <li key={user.userId} className="thread-participants__item">
            <span>{user.username}</span>
            <span>{this.renderStatusIcon(user.status)}</span>
          </li>
        )}
      </ul>
    );
  }

  renderStatusIcon(status) {
    const isTyping = status === 'typing';

    return (
      <div className="activity-indicator">
        {isTyping ? (
          <div className="typing-indicator">
            <span /><span /><span />
          </div>
        ) : <div className="green-dot" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  participants: getSelectedThreadParticipants(state)
});

export default connect(mapStateToProps)(ThreadParticipants);
