import { createStore, combineReducers } from "redux";
import excelReducer from './excel/reducer'
const rootReducer = combineReducers({
  excel: excelReducer
});

let store = createStore(rootReducer);

export default store;