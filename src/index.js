import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

const store = createStore( reducer, middleware );

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById( 'root' ),
);

