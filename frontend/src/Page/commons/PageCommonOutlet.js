import { useContext } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import { Outlet } from "react-router-dom";
import LibComponentNavbar from "../../libs/components/LibComponentNavbar.js";
import Login from "../Login.js";
import Header from "../../libs/components/Header.js";

const PageCommonOutlet = () => {
  const application = useContext(ContextApplication);

  return (
    <>
      {application.isAuthenticated ? (
        <>
          <LibComponentNavbar />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default PageCommonOutlet;
