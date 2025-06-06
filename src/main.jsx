import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
