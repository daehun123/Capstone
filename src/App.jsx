import { Outlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Layout from "./components/frame/Layout";
import { Suspense } from "react";

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-10 text-center">로딩 중...</div>}>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
}

export default App;
