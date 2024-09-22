import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  // Link,
  Button,
} from "@nextui-org/react";
// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logoutbutton from "./logoutbutton.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./head.css";
const Header = () => {
  let status = useSelector((state) => state.doc.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const url = [
    { url: "/", name: "Home" },
    { url: "/Create-post", name: "Create Post" },
    { url: "/My-post", name: "My Post" },
    { url: "/all-posts", name: "All Posts" },
  ];

  const url2 = [
    { url: "/", name: "Home" },
    { url: "/Signup", name: "Signup" },
    { url: "/Login", name: "Login" },
  ];

  return status ? (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="dark bg-black text-white"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="text-white">MY EDITON OF BLOG</NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          {url.map((e, index) => (
            <Button
              key={index}
              color="danger"
              variant="ghost"
              className="m-[0.5vw]"
              onClick={() => {
                navigate(`${e.url}`);
              }}
            >
              <NavLink to={e.url}>{e.name}</NavLink>
            </Button>
          ))}
          <Logoutbutton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {url.map((e, index) => (
          <NavbarMenuItem key={`${e}-${index}`}>
            <NavLink
              className="w-full text-black transition-colors active:text-zinc-600 active:hover:text-zinc-700"
              to={e.url}
              size="lg"
            >
              {e.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem key="1">
          <Logoutbutton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  ) : (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="dark bg-black text-white"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="text-white">MY EDITON OF BLOG</NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          {url2.map((e, index) => (
            <Button
              key={index}
              color="danger"
              variant="ghost"
              className="m-[0.5vw]"
              onClick={() => {
                navigate(`${e.url}`);
              }}
            >
              <NavLink to={e.url}>{e.name}</NavLink>
            </Button>
          ))}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {url2.map((e, index) => (
          <NavbarMenuItem key={`${e}-${index}`}>
            <NavLink
              className="w-full text-black transition-colors active:text-zinc-600 active:hover:text-zinc-700"
              to={e.url}
              size="lg"
            >
              {e.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
