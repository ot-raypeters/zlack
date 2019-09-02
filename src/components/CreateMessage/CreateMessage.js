import React from 'react';
import { connect } from 'react-redux';
import { startedTyping, stoppedTyping } from '../../actions/threads';
import { createAndVerifyMessage } from '../../actions/messages';
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
    const { threadId } = this.props;
    this.props.startedTyping(threadId);
  }

  createOnEnter(ev) {
    if (ev.key === 'Enter') {
      this.createMessage(ev.target.value);
      ev.target.value = '';
      ev.preventDefault();
      return false;
    }

    if (ev.key === 'Escape') {
      this.fireOnEscapeHandler();
    }
  }

  createMessage(body) {
    const { createMessage, threadId } = this.props;
    if (typeof createMessage === 'function') {
      return createMessage(threadId, body);
    }
  }

  fireOnEscapeHandler() {
    const { onEscape } = this.props;
    if (typeof onEscape === 'function') {
      onEscape();
    }
  }
}

const createMessage = createAndVerifyMessage;
const mapDispatchToProps = { createMessage, startedTyping, stoppedTyping };
export default connect(null, mapDispatchToProps)(CreateMessage);
