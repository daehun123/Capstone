import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Notfound } from "./pages/Notfound";
import { Home } from "./pages/home";
import FirstPage from "./pages/FirstPage";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
