import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import GoogleButton from "react-google-button";
import { login } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken); // Getting the access token provided by google after the user is authenticated

  useEffect(() => {
    // If no access token, user will be redirected to the login page
    if (accessToken) navigate("/");
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <div className="login_page">
      <Card sx={{ maxWidth: 345 }} className="login_card">
        <CardMedia
          component="img"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          alt="green iguana"
        />

        <CardActions className="login_btn">
          <GoogleButton
            onClick={() => {
              dispatch(login()); // login action is dispatched
            }}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
