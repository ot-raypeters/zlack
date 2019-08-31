import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList/MessageList';
import CreateMessage from '../CreateMessage/CreateMessage';
import { getSelectedSubthread } from '../../selectors/threads';
import './SelectedSubthread.css';

class SelectedSubthread extends React.Component {
  render() {
    const { channel, userId } = this.props;

    return (
      <div className="selected-thread selected-thread--subthread">
        <div className="selected-thread__header">
          <h3 className="selected-thread__header__title">
            Viewing subthread
          </h3>
        </div>

        <div className="selected-thread__messages">
          <MessageList
            messages={channel.messages} />
        </div>

        <div className="selected-thread__create-message">
          <CreateMessage
            threadId={channel.subthread.uid}
            userId={userId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user && state.auth.user.userId,
  channel: getSelectedSubthread(state)
})

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SelectedSubthread);