import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./App.css";
import Home from "./Components/Home";
import CreateStudent from "./Components/CreateStudent";
import EditStudent from "./Components/EditStudent";
import RegistrationForm from "./Components/Authentication/RegistrationForm";
import LogInForm from "./Components/Authentication/LogInForm";
import AuthContext, { AuthProvider } from "./store/AuthProvider";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<LogInForm />} />
          <Route path="/register" exact element={<RegistrationForm />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/add-student" element={<CreateStudent />} />
          <Route path="/edit-student" element={<EditStudent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
