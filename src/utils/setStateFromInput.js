const setStateFromInput = (dispatch, action) => (payload) => dispatch({ type: action, payload });

export default setStateFromInput;
