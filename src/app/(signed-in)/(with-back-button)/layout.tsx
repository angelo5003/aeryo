import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>Layout</h1>
      {children}
    </div>
  );
};

export default Layout;
