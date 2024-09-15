import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/pages/Layout.jsx";
import { Login } from "./components/pages/login.jsx";
import { Signup } from "./components/pages/signup.jsx";
import { Createpost } from "./components/pages/createpost.jsx";
import { Provider } from "react-redux";
import store  from "./store/store.js";
import { Mypost } from "./components/pages/mypost.jsx";
import { Editpost } from "./components/pages/editpost.jsx";
import { Post } from "./components/pages/post.jsx";
import { Allpost } from "./components/pages/allpost.jsx";
import { Readmore } from "./components/pages/readmore.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/create-post",
        element: <Createpost />,
      },
      {
        path: "/My-post",
        element: <Mypost />,
      },
      {
        path: "/all-posts",
        element: <Allpost />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/edit",
        element: <Editpost />,
      },
      {
        path: "/readmore",
        element: <Readmore />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
