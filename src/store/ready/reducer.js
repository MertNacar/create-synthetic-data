import actions from "./actions";

const initialState = false;

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PAGE_READY:
      return action.payload
    default:
      return state;
  }
};



export default pageReducer;
