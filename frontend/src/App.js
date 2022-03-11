import * as React from "react";
import Container from "@mui/material/Container";
import Logo from "./components/Logo";
import FormSignUp from "./components/FormSignUp";
import "./app.scss";

function App() {
  return (
    <Container class="container" maxWidth="sm">
      <Logo />
      <FormSignUp />
    </Container>
  );
}

export default App;
