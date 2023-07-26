import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./App.css";
import Home from "./Components/Home";
import CreateStudent from "./Components/CreateStudent";
import EditStudent from "./Components/EditStudent";
import RegistrationForm from "./Components/Authentication/RegistrationForm";
import LogInForm from "./Components/Authentication/LogInForm";
import AuthContext, { AuthProvider } from "./store/AuthProvider";
import Layout from "./Components/Authentication/Layout";
import NotFound from "./Components/NotFound";
import RequireAuthentication from "./Components/Authentication/RequireAuthentication";
import Unauthorised from "./Components/Authentication/Unauthorised";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/unauthorised" element={<Unauthorised />} />

            <Route
              element={
                <RequireAuthentication
                  allowedRoles={["Teacher", "Student", "Admin"]}
                />
              }
            >
              <Route path="/" exact element={<Home />} />
            </Route>
            <Route
              element={
                <RequireAuthentication allowedRoles={["Teacher", "Admin"]} />
              }
            >
              <Route path="/add-student" element={<CreateStudent />} />
              <Route path="/edit-student" element={<EditStudent />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
