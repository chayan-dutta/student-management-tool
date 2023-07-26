import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import "./LogInForm.css";
import { Login_User } from "../../GraphQLOperations/Mutations";
import AuthContext from "../../store/AuthProvider";
import Home from "../Home";

const defaultTheme = createTheme();

const LogInForm = () => {
  const [userLogin, { data, loading, error }] = useMutation(Login_User);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [usernameIsTouched, setUsernameIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPasswordIsTouched(true);
    setUsernameIsTouched(true);
    const formIsValid = formValidation();
    if (formIsValid) {
      completeLogin();
    } else {
      console.log("Invalid form");
      return;
    }
  };

  const formValidation = () => {
    if (password.trim().length > 4) {
      setPasswordIsValid(true);
    }
    if (username.trim().length > 4) {
      setUsernameIsValid(true);
    }
    if (usernameIsValid && passwordIsValid) {
      return true;
    } else {
      return false;
    }
  };

  const onBlurHandlers = (field) => {
    if (field === "username") {
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
    if (field === "username") {
      setUsername(value);
      if (username.trim().length > 4) {
        setUsernameIsValid(true);
      }
    } else if (field === "pass") {
      setPassword(value);
      if (password.trim().length > 4) {
        setPasswordIsValid(true);
      }
    }
  };

  const completeLogin = () => {
    console.log({ username, password });
    userLogin({
      variables: { username: username, password: password },
    }).then((data) => {
      console.log(data);
      if (data.data.userLogin === "User Doesnot Exist") {
        MySwal.fire({
          title: "Invalid Username",
          icon: "error",
          html: "No user found with this username",
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          allowOutsideClick: false,
        });
      } else if (data.data.userLogin === "Invalid Password") {
        MySwal.fire({
          title: "Invalid Password",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          allowOutsideClick: false,
        });
      } else {
        navigate("/");
        localStorage.setItem("jwtToken", data.data.userLogin);
        authCtx.setUserDetails(data.data.userLogin);
      }
    });
  };

  if (authCtx.isAuthenticated) {
    setTimeout(() => {
      navigate("/");
    }, 0);
  }

  return (
    <div className="logindiv">
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
                  The username is required and should be atleast 4 characters
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                  The password is required and should be atleast 4 characters
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default LogInForm;
