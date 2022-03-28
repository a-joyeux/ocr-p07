import * as React from "react";
import Container from "@mui/material/Container";
import Logo from "./components/Logo";
import FormSignUp from "./components/FormLogin";
import { Link } from "react-router-dom";
import "./app.scss";

function App() {
  return (
    <Container className="container" maxWidth="sm">
      <Logo />
      <FormSignUp />
    </Container>
  );
}

export default App;
