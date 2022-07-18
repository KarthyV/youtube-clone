import { firebase } from "../../firebase";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const res = await firebase.auth().signInWithPopup(provider);

    console.log(res);
    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("ytc-access-token", accessToken);
    sessionStorage.setItem("ytc-user", JSON.stringify(profile));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: accessToken,
    });
    dispatch({
      type: "LOAD_PROFILE",
      payload: profile,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "LOGOUT" });

    sessionStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
