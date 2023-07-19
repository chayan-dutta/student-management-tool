import { useContext, useEffect } from "react";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";

const LogInForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let lu = localStorage.getItem("LoggedInUser");
    authCtx.isAuthenticated = true;
    if (lu) {
      navigate("/home");
    }
  }, []);

  const loginUser = ({ username, password }) => {
    const user = localStorage.getItem(username);
    if (user === password) {
      authCtx.isAuthenticated = true;
      const userLoggedIn = {
        username: username,
        password: password,
      };
      localStorage.setItem("LoggedInUser", JSON.stringify(userLoggedIn));
      navigate("/home");
    } else {
      console.log("Invalid username or password");
      navigate("/");
    }
  };

  return (
    <>
      <AuthForm purpose="Log In" onSubmitHandler={loginUser} />
      <p>
        Don't have any account?
        <Link to="/register">Click to register</Link>
      </p>
    </>
  );
};

export default LogInForm;
