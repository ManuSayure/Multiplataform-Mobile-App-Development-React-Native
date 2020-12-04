import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './src/components/Main';
import {ConfigureStore} from './src/redux/ConfigureStore';
import {Provider} from 'react-redux';

const store = ConfigureStore();
export default function App() {
  return (
    <Provider store={store}>
        <Main/>
    </Provider>
  
  );
}


