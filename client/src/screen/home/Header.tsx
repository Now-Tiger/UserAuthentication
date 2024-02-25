import React from "react";

const Header = () => {
  return (
    <>
      <ul className="flex gap-5">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/user/login">Login</a>
        </li>
        <li>
          <a href="/user/add">Register</a>
        </li>
      </ul>
    </>
  );
};

export default Header;
