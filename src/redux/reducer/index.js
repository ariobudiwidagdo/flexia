import {combineReducers} from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const reducer = combineReducers({
  userReducer,
  chatReducer,
});

export default reducer;
