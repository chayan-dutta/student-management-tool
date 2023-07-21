import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);

  if (!auth && localStorage.getItem("LoggedInUser")) {
    setAuth(true);
  }

  const authContext = {
    isAuthenticated: auth,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
