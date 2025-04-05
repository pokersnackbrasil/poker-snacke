import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  Login  from "../screens/Login";
import { Home } from "../screens/Home";
import { PrivateRoute } from './PrivateRoute';

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
			    {/* Aberto */}
        	<Route path="/Login" element={<Login/>} />

          <Route element={<PrivateRoute requiredLevel="1" />}>
            <Route path="/Home" element={<Home />} />
          </Route>

        	<Route path="/Home" element={<Home/>} />









        	<Route path="*" element={<Home/>} /> 
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
