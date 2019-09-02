import React from 'react';
import { connect } from 'react-redux';
import ThreadParticipants from '../ThreadParticipants/ThreadParticipants';
import { selectThread } from '../../actions/threads';
import './ThreadList.css';

class ThreadList extends React.Component {
  render() {
    return (
      <ul className="thread-list noselect">
        <li className="thread-list__title">Zlack</li>
        <li className="thread-list__section">Threads</li>
        {this.props.threads && this.props.threads.all
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
        {isActive && <ThreadParticipants />}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  threads: state.entities.threads,
  selectedThreadId: state.threads.selectedThreadId
});

const mapDispatchToProps = { selectThread };

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
