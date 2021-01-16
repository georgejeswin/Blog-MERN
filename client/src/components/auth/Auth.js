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

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };
  const handleSubmit = () => {};
  const handleChange = () => {};
  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    handleShowPassword(false);
  };
  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  className={classes.inputField}
                  name="firstname"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  className={classes.inputField}
                  name="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  half
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
          <Grid type="container" justify="flex-end">
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
