import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './service-worker';
import BaseWorker from './workers/BaseWorker';
import App from './components/App/App';
import store from './store';
import './form-control.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

const worker = new BaseWorker(`${process.env.PUBLIC_URL}/ToxicityReporter.js`);
const messages = [
  { body: 'hello world', uid: 1 },
  { body: 'you suck!!', uid: 2 }
];

const work = () => worker.request('predict', { messages });
work().then(work).then(work).then(work).then(work)
  .then((result) => {
    debugger;
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
