import React from 'react';
import { connect } from 'react-redux';
import { createMessage, startedTyping, stoppedTyping } from '../../actions/messages';
import Textarea from 'react-textarea-autosize';
import './CreateMessage.css';

class CreateMessage extends React.Component {
  render() {
    return (
      <div className="create-message">
        <Textarea
          autoFocus
          minRows={2}
          placeholder="Send a message.."
          onChange={() => this.emitActivity()}
          onKeyDown={(ev) => this.createOnEnter(ev)} />
      </div>
    );
  }

  emitActivity() {
    const { userId, threadId } = this.props;
    this.props.startedTyping(userId, threadId);
  }

  createOnEnter(ev) {
    if (ev.key === 'Enter') {
      this.createMessage(ev.target.value);
      ev.target.value = '';
      ev.preventDefault();
      return false;
    }
  }

  createMessage(body) {
    const { userId, threadId } = this.props;
    return this.props.createMessage(userId, threadId, body);
  }
}

const mapDispatchToProps = { createMessage, startedTyping, stoppedTyping };
export default connect(null, mapDispatchToProps)(CreateMessage);