import { Outlet } from "react-router-dom";


import Header from "../components/User/Header";

const UserAuthLayout = () => {

  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};

export default UserAuthLayout;        