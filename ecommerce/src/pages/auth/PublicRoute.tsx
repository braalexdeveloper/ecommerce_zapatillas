import { Navigate, Outlet } from "react-router-dom";


export const PublicRoute=()=>{
    const user=JSON.parse(localStorage.getItem("user") || 'null'); 
    if(user){
      return <Navigate to="/mis-pedidos" replace/>;
    }

    return <Outlet/>;

}