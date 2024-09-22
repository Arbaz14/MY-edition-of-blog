import { useEffect, useState } from "react";
import service from "../src/components/appwrite/config.js"; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/docsslice.js";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.doc.status);
  const navigate = useNavigate();

  useEffect(() => {
    service
      .getUser()
      .then((response) => {
        console.log(response);
        dispatch(login({ data: response }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center  justify-center bg-gradient-to-r from-gray-900 to-black p-4">
      {status ? (
        <h1 className="text-white text-4xl">
          Welcome TO See Posts{" "}
          <Button
            onClick={() => {
              navigate("/all-posts");
            }}
            color="warning"
          >
            Click Here{" "}
          </Button>
        </h1>
      ) : (
        <h1 className="text-white text-4xl">Please Login</h1>
      )}
    </div>
  );
}

export default App;
