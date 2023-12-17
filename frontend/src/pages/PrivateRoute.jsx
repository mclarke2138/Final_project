import {Outlet, Navigate} from "react-router-dom";
import Cookies from "js-cookie";
export default function PrivateRoutes()
{
    const cookie = Cookies.get("jwt-cookie")
    return cookie ? <Outlet /> : <Navigate to="/not-authorized"/>
}