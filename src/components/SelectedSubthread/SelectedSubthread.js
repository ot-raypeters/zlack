import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList/MessageList';
import { getSelectedSubthread } from '../../selectors/threads';
import './SelectedSubthread.css';

class SelectedSubthread extends React.Component {
  render() {
    const { messages } = this.props.channel;

    return (
      <div className="selected-subthread">
        <MessageList messages={messages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channel: getSelectedSubthread(state)
})

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SelectedSubthread);