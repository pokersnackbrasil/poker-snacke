import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  Login  from "../screens/Login";
import { Home } from "../screens/Home";
import { PrivateRoute } from "./privateRoute"

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>

          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoute requiredLevel="1" />}>
            <Route path="/Home" element={<Home />} />
          </Route>
          
          <Route path="*" element={<Login />} />

        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
