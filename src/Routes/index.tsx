import {  Route, Routes } from "react-router-dom";
import  Login  from "../screens/Login";
import { Home } from "../screens/Home";
import { Home_1 } from "../screens/Home_1";
import { Home_2 } from "../screens/Home_2";
import { Register } from "../screens/Register";
import ProtectedRoute from "./ProtectedRouter";
import RoleRoute from "./RooleRouter";
import RedirectByRole from "./RedirectByRole";
import Gerenciamento from "../screens/Gerenciamento";

export const RoutesApp = () => {
//   const levelAccess = useSelector((state) => state.user.userData?.data?.acesso);

  return (


    <Routes>


      <Route path="/login" element={<RedirectByRole><Login/></RedirectByRole>} />

      <Route path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>

      <Route
        path="/spin&go&fish"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["0","1","4","6","7"]}>
              <Home_1 />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/spin&go&reg"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["0","2","4","5","7"]}>
              <Home_2/>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["0"]}>
              <Register/>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/gerenciamento"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["0"]}>
              <Gerenciamento/>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Login />} />
      <Route path="/" element={<Login />} />

    </Routes>


  );
};
