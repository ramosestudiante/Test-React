import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <> 
  <div className="w-full h-full">
     {children}
  </div>
    </>;
};

export default Layout;
