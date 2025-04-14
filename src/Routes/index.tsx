import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  Login  from "../screens/Login";
import { Home } from "../screens/Home";
import { Home_1 } from "../screens/Home_1";
import { Home_2 } from "../screens/Home_2";
import { PrivateRoute } from "./privateRoute"

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>

          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoute/>}>
            <Route path="/Home" element={<Home/>} />
          </Route>
          <Route element={<PrivateRoute requiredLevel="1"/>}>
            <Route path="/spin&go" element={<Home_1 />} />
          </Route>
          <Route element={<PrivateRoute requiredLevel="2"/>}>
            <Route path="/bountybuilders" element={<Home_2/>} />
          </Route>
          
          <Route path="*" element={<Login />} />

        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
