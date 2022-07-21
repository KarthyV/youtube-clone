import { firebase } from "../../firebase";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const provider = new firebase.auth.GoogleAuthProvider(); // Firebase google auth provider
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl"); // adding the scope of youtube for using the accesstoken as key

    const res = await firebase.auth().signInWithPopup(provider); //SignIn with popup method

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture,
      id: res.additionalUserInfo.profile.id,
    };

    sessionStorage.setItem("ytc-access-token", accessToken); //Storing the details in sessionStorage as well
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
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  //Logout action, firebase method
  try {
    await firebase.auth().signOut();
    dispatch({ type: "LOGOUT" });

    sessionStorage.clear(); // clearing the session storage once logged out
  } catch (error) {
    console.log(error);
  }
};
