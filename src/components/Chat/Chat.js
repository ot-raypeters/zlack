import React from 'react';
import { connect } from 'react-redux';
import ThreadList from '../ThreadList/ThreadList';
import SelectedThread from '../SelectedThread/SelectedThread';
import SelectedSubthread from '../SelectedSubthread/SelectedSubthread';
import './Chat.css';

class Chat extends React.Component {
  render() {
    return (
      <div className="chat fullscreen">
        <div className="chat__thread-list">
          <ThreadList />
        </div>

        {this.props.selectedThreadId &&
          <div className="chat__selected-thread">
            <SelectedThread />
          </div>}

        {this.props.selectedSubthreadId &&
          <div className="chat__selected-subthread">
            <SelectedSubthread />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedThreadId: state.threads.selectedThreadId,
  selectedSubthreadId: state.threads.selectedSubthreadId
});

export default connect(mapStateToProps)(Chat);
