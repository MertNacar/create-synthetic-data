import ReactDOM from 'react-dom';
import Routing from './Routing';
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
ReactDOM.render(<Provider store={store}> <Routing /></Provider>, document.getElementById('root'));

