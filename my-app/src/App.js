import "./App.css";

import WithTheme from "./utils/withTheme";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <WithTheme>
      <Routes>
        <Route path="Login/*" element={<Login />} />
        <Route path="Signup/*" element={<Signup />} />
        <Route path="Dashboard/*" element={<Dashboard />} />
      </Routes>
    </WithTheme>
  );
}

export default App;
