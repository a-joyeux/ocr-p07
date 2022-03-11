import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

class FormLogin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField
          id="email"
          size="small"
          label="Email"
          margin="normal"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="password"
          size="small"
          type="password"
          label="Password"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button sx={{ mt: "20px" }} variant="contained" endIcon={<SendIcon />}>
          Login
        </Button>
      </React.Fragment>
    );
  }
}

export default FormLogin;
