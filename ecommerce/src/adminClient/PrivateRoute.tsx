import { Navigate,Outlet } from "react-router-dom";

/*interface PrivateRouteProps{
    children:React.ReactNode;
}

export const PrivateRoute=({children}:PrivateRouteProps)=>{
 const user = JSON.parse(localStorage.getItem("user") || "null");
 if(!user){
    return <Navigate to="/login" replace />;
 }
 return <>{children}</>;
};*/

interface PrivateRouteProps{
    allowedRoles?:string[];
}

export const PrivateRoute=({allowedRoles}:PrivateRouteProps)=>{

 const user = JSON.parse(localStorage.getItem("user") || "null");
 if(!user){
    return <Navigate to="/login" replace />;
 }

 // Si hay roles definidos, verificar que el rol del usuario esté permitido
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <h1>No tienes acceso</h1>;
  }

 return <Outlet/>;
}