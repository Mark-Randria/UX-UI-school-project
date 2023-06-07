import "./App.css";

import WithTheme from "./utils/withTheme";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <WithTheme>
      <Routes>
        <Route path="Login/*" element={<Login />} />
        <Route path="Signup/*" element={<Signup />} />
      </Routes>
    </WithTheme>
  );
}

export default App;
