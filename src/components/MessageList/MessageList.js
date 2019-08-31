import React from 'react';
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
        {isEmpty && this.getEmptyView()}
        {messages.map(this.renderMessageItem.bind(this))}
      </ol>
    );
  }

  getEmptyView() {
    return (
      <li className="message-list__item">
        <i>Nothing seems to be here</i>
      </li>
    );
  }

  renderMessageItem(message) {
    return (
      <li key={message.uid}
        className="message-list__item"
        onClick={this.onSelect.bind(this, message)}>
        {message.body}
      </li>
    );
  }

  onSelect(message) {
    if (typeof this.props.onSelect === 'function') {
      return this.props.onSelect(message);
    }
  }
}

export default MessageList;