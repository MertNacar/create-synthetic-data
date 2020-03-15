import actions from "./actions";

const initialState = [];

const excelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_EXCEL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};



export default excelReducer;
