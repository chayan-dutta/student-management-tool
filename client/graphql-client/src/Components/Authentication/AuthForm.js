import { useState } from "react";

const AuthForm = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmitHandler({
      username: userName,
      password: password,
    });
    setPassword("");
    setUserName("");
  };

  const onChangeHandler = (field, value) => {
    if (field === "username") {
      setUserName(value);
    }
    if (field === "pass") {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="registrationFprm">
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username here"
            required
            value={userName}
            onChange={(e) => onChangeHandler("username", e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password here"
            required
            value={password}
            onChange={(e) => onChangeHandler("pass", e.target.value)}
          />
          <br />
          <button type="submit">{props.purpose}</button>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
