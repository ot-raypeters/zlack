import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { upsertEntities } from './actions/entities';
import { connect } from './actions/user';
import App from './components/App/App';
import store from './store';
import './form-control.css';
import './index.css';

store.dispatch(connect());

store.dispatch(upsertEntities('threads', [
  { uid: 'general', name: 'General' },
  { uid: 'ama', name: 'Ask me anything' }
]));

store.dispatch(upsertEntities('messages', [
  { uid: 1, userId: 1, threadId: 'general', body: 'hello world' },
  { uid: 2, userId: 1, threadId: 'general', body: 'marco polo' }
]));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
