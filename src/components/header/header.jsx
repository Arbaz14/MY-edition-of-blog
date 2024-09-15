import { NavLink } from "react-router-dom";
import "./header.css";
import  Logoutbutton from './logoutbutton.jsx'
import { useSelector } from "react-redux";
const Header = () => {
  let status = useSelector((state) => state.doc.status);

  const url = [
    { url: "/", name: "Home" },
    { url: "/Create-post", name: "Create post" },
    { url: "/My-post", name: " My post" },
    { url: "/all-posts", name: " all posts" },
  ];
  const url2 = [
    {url: "/", name: "Home" },
    {url: "/Signup", name: "Signup" },
    {url: "/Login", name: "Login" },
  ];

  return (
    <>
      <div className="header">
        <div className="LOGO">MY EDITON OF BLOG</div>
        <div>
          {/* This code work when we get status true from react-store */}

          {status && (
            <ul>
              {url.map((e,index) => (
                <li key={index}><NavLink to={e.url} onClick={()=> console.log("hello")}>{e.name}</NavLink></li>
              ))}
              <Logoutbutton/>
            </ul>
          )}
          {/* This code work when we get status false from react-store */}
          {!status && (
            <ul>
              {url2.map((e,index) => (
                <li key={index}>
                  <NavLink to={e.url}>{e.name}</NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
