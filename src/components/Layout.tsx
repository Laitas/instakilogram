import React from "react";
import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="max-w-[1440px] mx-auto px-4">{children}</div>
    </>
  );
};

export default Layout;
