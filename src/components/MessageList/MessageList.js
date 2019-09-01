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
      <li className="message-list__item">
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
    const user = this.props.users.byId[message.userId];

    return (
      <li className="message-list__author">
        {user.username} said..
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

const mapStateToProps = ({ entities }) => ({
  users: entities.users
});

export default connect(mapStateToProps)(MessageList);
