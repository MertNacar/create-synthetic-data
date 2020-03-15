import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import store from './store/store'
import { Provider } from 'react-redux'
ReactDOM.render(<Provider store={store}> <Routing /> </Provider>, document.getElementById('root'));

