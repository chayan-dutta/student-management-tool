import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthForm from "./AuthForm";
import AuthContext from "../../store/AuthProvider";

const RegistrationForm = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const registerUser = ({ username, password }) => {
    localStorage.setItem(username, password);
    localStorage.setItem(
      "LoggedInUser",
      JSON.stringify({
        username: username,
        password: password,
      })
    );
    ctx.isAuthenticated = true;
    navigate("/home");
  };

  return (
    <>
      <AuthForm purpose="Register" onSubmitHandler={registerUser} />
      <p>
        Already an user?
        <Link to="/">Log In Here</Link>
      </p>
    </>
  );
};

export default RegistrationForm;
