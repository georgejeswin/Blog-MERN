import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import useStyles from "./styles";

const Input = ({
  half,
  name,
  label,
  handleChange,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  const classes = useStyles();
  return (
    <Grid xs={12} sm={half ? 6 : 12} spacing={2}>
      <TextField
        className={classes.inputField}
        m="2rem"
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={
          name === "password" && {
            endAdordnment: (
              <InputAdornment position="end">
                <IconButton click={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      ></TextField>
    </Grid>
  );
};

export default Input;
