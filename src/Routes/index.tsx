import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  Login  from "../screens/Login";
import { Home } from "../screens/Home";

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
			    {/* Aberto */}
        	<Route path="/Home" element={<Home/>} />


        	<Route path="/Login" element={<Login/>} />







        	<Route path="*" element={<Home/>} /> 
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
