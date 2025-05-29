import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import HomeLayout from "../layout/HomeLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
