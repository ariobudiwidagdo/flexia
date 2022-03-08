import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = createStore(persistedReducer, applyMiddleware(thunk));
const Persistor = persistStore(Store);

export {Store, Persistor};
