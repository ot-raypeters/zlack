import React from 'react';
import { connect } from 'react-redux';
import './MessageList.css';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidUpdate(previousProps) {
    const { current } = this.listRef;
    const lastListElement = current && current.querySelector('li:last-child');
    if (lastListElement) {
      lastListElement.scrollIntoView(true);
    }
  }

  render() {
    const { messages } = this.props;
    const isEmpty = messages.length === 0;

    return (
      <ol className="message-list"
        ref={this.listRef}>
        {isEmpty ?
          this.getEmptyView() :
          this.renderMessagesByAuthor()}
      </ol>
    );
  }

  getEmptyView() {
    return (
      <li key="empty" className="message-list__item">
        <i>Nothing seems to be here</i>
      </li>
    );
  }

  renderMessagesByAuthor() {
    const { messages } = this.props;

    let lastMessage;
    return messages.reduce((listItems, message) => {
      if (!lastMessage || lastMessage.userId !== message.userId) {
        const userByLine = this.getUserByLine(message);
        listItems.push(userByLine);
      }

      const formattedMessage = this.renderMessageItem(message);
      listItems.push(formattedMessage);
      lastMessage = message;

      return listItems;
    }, []);
  }

  getUserByLine(message) {
    const { users } = this.props;
    const user = users.byId[message.userId];

    return (
      <li
        key={`${user.uid}-${message.uid}`}
        className="message-list__author">
        {user.username} said..
      </li>
    );
  }

  renderMessageItem(message) {
    const { allMessages, showReplyCount } = this.props;

    const replies = allMessages.filter(m => m.threadId === message.uid);
    const hasReplies = showReplyCount && replies.length > 0;

    const hasWarnings = message.warnings && message.warnings.length;
    const warningClasses = hasWarnings ? message.warnings.join(' ') : '';
    const clickHandler = this.onSelect.bind(this, message);

    return (
      <li key={message.uid}
        className={`message-list__item ${warningClasses}`}
        onClick={clickHandler}>
        {message.body}

        {hasReplies &&
          <span className="reply-count">
            {replies.length === 1 ? '1 reply' : `${replies.length} replies`}
          </span>
        }

        {hasWarnings &&
          <div className="message-list__item__warnings">
            Violations: {message.warnings.join(', ')}
          </div>
        }
      </li>
    );
  }

  onSelect(message) {
    const hasWarnings = message.warnings && message.warnings.length;
    // @note users cannot reply to messages with warnings
    if (hasWarnings) return;

    if (typeof this.props.onSelect === 'function') {
      return this.props.onSelect(message);
    }
  }
}

const mapStateToProps = ({ entities }) => ({
  allMessages: entities.messages.all,
  users: entities.users
});

export default connect(mapStateToProps)(MessageList);
