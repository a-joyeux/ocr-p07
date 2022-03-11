import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./styles/FormLogin.scss";

class FormLogin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Box className="formLogin">
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
          <p>
            <a class="link" href="">
              Pas encore de compte ?
            </a>
          </p>
        </Box>
      </React.Fragment>
    );
  }
}

export default FormLogin;
