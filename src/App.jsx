import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Notfound } from "./pages/Notfound";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
