import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Dashboard from './views/dashboard';

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
