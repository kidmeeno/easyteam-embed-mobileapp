const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_STATE":
      return { ...state, ...action.payload};
    case "SET_ISGLOBALTRACKING":
      return { ...state, isGlobalTrackingEnabled: action.payload };
    default:
      return state;
  }
};

export default appReducer;
