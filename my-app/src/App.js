import "./App.css";

import WithTheme from "./utils/withTheme";
import withAuth from "./utils/withAuth";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard/dashboard";

const ConnectedDashboard = withAuth(Dashboard); 

function App() {
  return (
    <WithTheme>
      <Routes>
        <Route path="Login/*" element={<Login />} />
        <Route path="Signup/*" element={<Signup />} />
        <Route path="Dashboard/*" element={<ConnectedDashboard />} />
      </Routes>
    </WithTheme>
  );
}

export default App;
