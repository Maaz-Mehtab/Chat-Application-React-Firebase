import React, { Component } from 'react';
import Routers from './router';
import {Provider} from 'react-redux';
import store from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
