import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './src/components/Main';
import {ConfigureStore} from './src/redux/ConfigureStore';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();
//const store = ConfigureStore();
export default function App() {
  return (
    
      <Provider store={store}> 
        <PersistGate
          loading = {<Loading/>}
          persistor = {persistor}>
           <Main/> 
          
        </PersistGate>
      </Provider>
    
    
  
  );
}


