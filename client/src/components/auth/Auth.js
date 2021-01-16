import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import Input from "./Input";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { login, signup } from "../../actions/auth";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google login was unsuccesful , please try again");
  };

  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(login(formData, history));
    }
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };
  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid type="container" spacing={2}>
            {isSignup && (
              <>
                <Input
                  // className={classes.inputField}
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  // onChange={(e) => setFormData({ firstName: e.target.value })}
                  autoFocus
                  // half
                />

                <Input
                  // className={classes.inputField}
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  // half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email Address"
              handleChange={handleChange}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              label="Password"
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                className={classes.inputField}
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
          <GoogleLogin
            clientId="977328032660-lr7pcoci1jipeurt8n0kck3bte5uv6j5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Login
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid type="container">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account"
                  : "Don't have and account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
