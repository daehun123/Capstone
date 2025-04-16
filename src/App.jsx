import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Notfound } from "./pages/Notfound";
import { Home } from "./pages/Home";
import FirstPage from "./pages/FirstPage";
import MyPage from "./pages/Mypage";
import Setting from "./pages/Setting";
import { AnimatePresence } from "framer-motion";
import BookMarkPage from "./pages/BookMarkPage";

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/bookmark" element={<BookMarkPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
