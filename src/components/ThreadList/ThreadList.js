import React from 'react';
import { connect } from 'react-redux';
import { selectThread } from '../../actions/threads';
import './ThreadList.css';

class ThreadList extends React.Component {
  render() {
    return (
      <ul className="thread-list">
        <li className="thread-list__section">Channels</li>
        {this.props.threads.all
          .map(this.renderThreadListItem.bind(this))}
      </ul>
    );
  }

  renderThreadListItem(thread) {
    const isActive = this.props.selectedThreadId === thread.uid;
    const classes = `thread-list__item ${isActive ? 'thread-list__item--active' : ''}`;

    return (
      <li key={thread.uid}
        className={classes}
        onClick={() => this.props.selectThread(thread.uid)}>
        {thread.name}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedThreadId: state.threads.selectedThreadId,
  threads: state.entities.threads
});

const mapDispatchToProps = { selectThread };

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
