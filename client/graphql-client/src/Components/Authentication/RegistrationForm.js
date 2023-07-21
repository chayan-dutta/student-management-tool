import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import "./RegistrationForm.css";
import { Register_User } from "../../GraphQLOperations/Mutations";

const defaultTheme = createTheme();

const RegistrationForm = () => {
  const [registerUser, { data, loading, error }] = useMutation(Register_User);
  const roles = ["Student", "Teacher"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roleIsValid, setRoleIsValid] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailValid] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [roleIsTouched, setRoleIsTouched] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [usernameIsTouched, setUsernameIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailIsTouched(true);
    setNameIsTouched(true);
    setPasswordIsTouched(true);
    setUsernameIsTouched(true);
    setRoleIsTouched(true);
    const formIsValid = formValidation();
    if (formIsValid) {
      completeRegistration();
    } else {
      console.log("Invalid form");
      return;
    }
  };

  const formValidation = () => {
    if (name.trim().length > 3) {
      setNameIsValid(true);
    }
    if (email.trim().length > 5) {
      setEmailValid(true);
    }
    if (role !== "") {
      setRoleIsValid(true);
    }
    if (password.trim().length > 4) {
      setPasswordIsValid(true);
    }
    if (username.trim().length > 4) {
      setUsernameIsValid(true);
    }
    if (
      roleIsValid &&
      nameIsValid &&
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onBlurHandlers = (field) => {
    if (field === "role") {
      setRoleIsTouched(true);
      if (role === "") {
        setRoleIsValid(false);
      }
    } else if (field === "name") {
      setNameIsTouched(true);
      if (name.trim().length < 3) {
        setNameIsValid(false);
      }
    } else if (field === "email") {
      if (email.trim().length < 5) {
        setEmailValid(false);
      }
      setEmailIsTouched(true);
    } else if (field === "username") {
      setUsernameIsTouched(true);
      if (username.trim().length > 4) {
        setUsernameIsValid(true);
      }
    } else if (field === "password") {
      setPasswordIsTouched(true);
      if (password.trim().length > 4) {
        setPasswordIsValid(true);
      }
    }
  };

  const onChangeHandlers = (field, value) => {
    if (field === "name") {
      setName(value);
      if (name.trim().length > 3) {
        setNameIsValid(true);
      }
    } else if (field === "email") {
      setEmail(value);
      if (email.trim().length > 5) {
        setEmailValid(true);
      }
    } else if (field === "username") {
      setUsername(value);
      if (username.trim().length > 4) {
        setUsernameIsValid(true);
      }
    } else if (field === "pass") {
      setPassword(value);
      if (password.trim().length > 4) {
        setPasswordIsValid(true);
      }
    } else if (field === "role") {
      setRole(value);
      if (value !== "") {
        setRoleIsValid(true);
        setRoleIsTouched(true);
      }
    }
  };

  const completeRegistration = () => {
    console.log({ name, email, username, password, role });
    registerUser({
      variables: {
        newUser: {
          id: "cf7a6f19-e435-4351-8bd4-9f510dfb17ab",
          name: name,
          email: email,
          username: username,
          password: password,
          role: role,
        },
      },
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="registerdiv">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Student Management Tool</h2>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    onChange={(event) =>
                      onChangeHandlers("name", event.target.value)
                    }
                    onBlur={() => {
                      onBlurHandlers("name");
                    }}
                    value={name}
                  />
                  {!nameIsValid && nameIsTouched && (
                    <Alert severity="error">
                      The name is required and should be atleast 3 characters
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) =>
                      onChangeHandlers("email", event.target.value)
                    }
                    onBlur={() => {
                      onBlurHandlers("email");
                    }}
                    value={email}
                  />
                  {!emailIsValid && emailIsTouched && (
                    <Alert severity="error">Please enter a valid email</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="lusername"
                    onChange={(event) =>
                      onChangeHandlers("username", event.target.value)
                    }
                    onBlur={() => {
                      onBlurHandlers("username");
                    }}
                    value={username}
                  />
                  {!usernameIsValid && usernameIsTouched && (
                    <Alert severity="error">
                      The username is required and should be atleast 4
                      characters
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) =>
                      onChangeHandlers("pass", event.target.value)
                    }
                    onBlur={() => {
                      onBlurHandlers("password");
                    }}
                    value={password}
                  />
                  {!passwordIsValid && passwordIsTouched && (
                    <Alert severity="error">
                      The password is required and should be atleast 4
                      characters
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      I Am A
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="I Am A"
                      onChange={(event) =>
                        onChangeHandlers("role", event.target.value)
                      }
                      onBlur={() => {
                        onBlurHandlers("role");
                      }}
                      value={role}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {!roleIsValid && roleIsTouched && (
                    <Alert severity="error">The role is required</Alert>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RegistrationForm;
