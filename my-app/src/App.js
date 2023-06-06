import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path="Login/*" element={ <Login />} />
      <Route path="Signup/*" element={ <Signup />} />
    </Routes>
  );
}

export default App;
