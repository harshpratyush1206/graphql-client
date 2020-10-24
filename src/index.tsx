import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store.store}>
         {/* <PersistGate loading={null} persistor={store.persistor}> */}
         <App />
         {/* </PersistGate> */}
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

serviceWorker.register();
