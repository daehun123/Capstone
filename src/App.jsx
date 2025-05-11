import { Outlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Layout from "./components/frame/Layout";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-10 text-center">로딩 중...</div>}>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </Suspense>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </Layout>
  );
}

export default App;
