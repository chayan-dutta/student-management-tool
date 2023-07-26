import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({
  isAuthenticated: false,
  userDetails: { name: "", role: "" },
  setUserDetails: (jwtToken) => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    name: name,
    role: role,
  });

  const decodeJWT = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      // as my claims are stored as 'nameidentifier' and 'role'
      const name =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      return { name, role };
    } catch (error) {
      console.log("Error decoding JWT:", error);
      return null;
    }
  };

  if (!auth && localStorage.getItem("jwtToken")) {
    let token = localStorage.getItem("jwtToken");
    setAuth(true);
    const { username, role } = decodeJWT(token);
    setName(username);
    setRole(role);
    setLoggedInUserDetails({ name: name, role: role });
  }

  const setUserDetailsFromJWT = (jwtToken) => {
    const { username, role } = decodeJWT(jwtToken);
    setName(username);
    setRole(role);
    setLoggedInUserDetails({ name: name, role: role });
    setAuth(true);
    console.log("Username and role", name, role);
  };

  const authContext = {
    isAuthenticated: auth,
    userDetails: loggedInUserDetails,
    setUserDetails: setUserDetailsFromJWT,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
