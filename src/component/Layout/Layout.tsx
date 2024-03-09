import React, {PropsWithChildren} from "react";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={"min-vh-100"}>
      {children}
    </div>
  );
};

export default Layout;