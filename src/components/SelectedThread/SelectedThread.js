import React from 'react';
import { connect } from 'react-redux';
import CreateMessage from '../CreateMessage/CreateMessage';
import MessageList from '../MessageList/MessageList';
import { getSelectedThread } from '../../selectors/threads';
import { selectSubthread } from '../../actions/threads';
import './SelectedThread.css';

class SelectedThread extends React.Component {
  render() {
    const { channel } = this.props;

    return (
      <div className="selected-thread">
        <div className="selected-thread__header">
          <h3 className="selected-thread__header__title">
            {`#${channel.thread.uid}`}
          </h3>
        </div>

        <div className="selected-thread__messages">
          <MessageList
            messages={channel.messages}
            onSelect={this.selectSubthread.bind(this)} />
        </div>

        <div className="selected-thread__create-message">
          <CreateMessage
            threadId={channel.thread.uid} />
        </div>
      </div>
    );
  }

  selectSubthread(message) {
    return this.props.selectSubthread(message.uid);
  }
}

const mapStateToProps = (state) => ({
  channel: getSelectedThread(state)
})

const mapDispatchToProps = { selectSubthread };
export default connect(mapStateToProps, mapDispatchToProps)(SelectedThread);