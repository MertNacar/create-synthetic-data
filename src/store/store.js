import { createStore, combineReducers } from "redux";
import excelReducer from './excel/reducer'
import pageReducer from './ready/reducer'
const rootReducer = combineReducers({
  excel: excelReducer,
  page: pageReducer
});

let store = createStore(rootReducer);

export default store;