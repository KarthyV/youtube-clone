const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? sessionStorage.getItem("ytc-user")
    : null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, accessToken: action.payload, loading: false };
    case "LOGIN_FAIL":
      return {
        ...state,
        accessToken: null,
        loading: false,
        user: null,
        error: action.payload,
      };
    case "LOAD_PROFILE":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, accessToken: null, user: null };
    default:
      return state;
  }
};

export default authReducer;