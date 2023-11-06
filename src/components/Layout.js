import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const LayoutTest = styled.div`
  .allforone {
    background-color: rgba(251, 251, 251, 236);
    height: 200vh;
    //
  }
  .main-page {
    display: flex;
    width: 100%;
    padding-top: 150px;

    /* .content {
      background-color: red;
    } */
  }

  // ss//
  .header {
    width: 100%;
  }
`;
//
const Layout = () => {
  return (
    <LayoutTest>
      <div className="allforone">
        <Header className="header" />
        <div className="main-page">
          <Sidebar className="sidebar" />
          <Outlet />
        </div>
      </div>
    </LayoutTest>
  ); //
};

export default Layout;
