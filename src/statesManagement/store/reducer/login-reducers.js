import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants";

const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, userInfo: null };
    default:
      state;
  }
};

export default loginReducer;
