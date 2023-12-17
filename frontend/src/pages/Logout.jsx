import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const navigate = useNavigate()
    const logout = () => {
        Cookies.remove("jwt-cookie")
        navigate("/")
    }
    return (
        <>
        <button onClick={logout}>Logout</button>
        </>
    )
}