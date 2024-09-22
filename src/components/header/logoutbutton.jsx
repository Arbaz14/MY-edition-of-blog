import React from "react";
import server from "../appwrite/config";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/docsslice";
const Logoutbutton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Button
        color="danger"
        onClick={() => {
          navigate("/login");
        }}
        variant="ghost"
      >
        <NavLink
          onClick={() => {
            dispatch(logout());
            server.logout();
          }}
          to={"/login"}
        >
          Logout
        </NavLink>
      </Button>
    </>
  );
};

export default Logoutbutton;
