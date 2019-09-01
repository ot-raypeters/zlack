import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList/MessageList';
import CreateMessage from '../CreateMessage/CreateMessage';
import { getSelectedSubthread } from '../../selectors/threads';
import { deselectSubthread } from '../../actions/threads';
import './SelectedSubthread.css';

class SelectedSubthread extends React.Component {
  constructor(props) {
    super(props);
    this.deselectSubthread = this.deselectSubthread.bind(this);
  }

  render() {
    const { channel } = this.props;

    return (
      <div className="selected-thread selected-thread--subthread">
        <div className="selected-thread__header">
          <h3 className="selected-thread__header__title">
            Viewing subthread
            <span
              className="close-button"
              onClick={this.deselectSubthread}>
              &times;
            </span>
          </h3>
        </div>

        <div className="selected-thread__messages">
          <MessageList
            messages={channel.messages}
            showReplyCount={false} />
        </div>

        <div className="selected-thread__create-message">
          <CreateMessage
            threadId={channel.subthread.uid}
            onEscape={this.deselectSubthread} />
        </div>
      </div>
    );
  }

  deselectSubthread() {
    if (typeof this.props.deselectSubthread === 'function') {
      return this.props.deselectSubthread();
    }
  }
}

const mapStateToProps = (state) => ({
  channel: getSelectedSubthread(state)
})

const mapDispatchToProps = { deselectSubthread };
export default connect(mapStateToProps, mapDispatchToProps)(SelectedSubthread);