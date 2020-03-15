import actions from "./actions";
const addExcel = excel => {
  return {
    type: actions.ADD_EXCEL,
    payload: excel
  };
};


export { addExcel };
