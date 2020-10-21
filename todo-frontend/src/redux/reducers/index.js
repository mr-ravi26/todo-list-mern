import { combineReducers } from 'redux';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    authState: authReducer,
});

// const rootReducer = (state, action) => {
//     return appReducer(state, action);
// };

export default rootReducer;