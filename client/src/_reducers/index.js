import { combineReducers } from "redux"; // 여러가지 Reducers를 결합하는 combineReducers
import user from './user_reducer';

const rootReducer = combineReducers({
     user
})

export default rootReducer;
