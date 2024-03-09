import React, {PropsWithChildren} from "react";
import Header from "../Header/Header.tsx";
import Modal from "../Modal/Modal.tsx";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={"min-vh-100"}>
      <Header/>
      <main>
        <div className={"container"}>
          <Modal />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;