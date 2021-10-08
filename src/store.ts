import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'posts',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialState = {};
const middleware = [thunk];

const store = createStore(persistedReducer, initialState,
  compose(applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
)

let persistor = persistStore(store)

export default { store, persistor };