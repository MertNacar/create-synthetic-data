import actions from "./actions";
const pageReady = ready => {
  return {
    type: actions.PAGE_READY,
    payload: ready
  };
};


export { pageReady };
