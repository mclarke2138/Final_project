

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [jwtCookie, setJwtCookie] = useState("");
  const navigate = useNavigate();

  const createCookie = (cookie) => {
    Cookies.set("jwt-cookie", cookie);
  };


  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 // const handleLogin = (message) => {
    //         return message == "Successful Login" ? navigate("/main") : console.log("no")
    //     }
    
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      const { message, token } = response.data;

      if (message === "Successful Login") {
        //createCookie(token);
        createCookie(response.data.token);
        setJwtCookie(jwtCookie);
        navigate("/main");
      } else {
        console.log("Authentication failed");
        setPostResponse(message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const makeCookie = (cookie) =>{
    Cookies.set("jwt-cookie",cookie)
  }
  const postUser = async (evt) => {
    evt.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      const { message, token } = response.data;
  
      if (message === "Successful Login") {
        makeCookie(response.data.token)
        navigate("/main");
      } else {
        setPostResponse(message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  
    setFormData({
      username: "",
      password: "",
    });
  };
  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <form onSubmit= {postUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="username" style={{ marginBottom: '8px', fontSize: '14px' }}>Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleOnChange}
          value={formData.username}
          required
          style={{ padding: '8px', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}
        />

        <label htmlFor="password" style={{ marginBottom: '8px', fontSize: '14px' }}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleOnChange}
          value={formData.password}
          required
          style={{ padding: '8px', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}
        />

        <button
          onClick={() => handleLogin(postResponse)}
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

       <p style={{ marginTop: '16px', textAlign: 'center', color: 'red' }}>{postResponse}</p>
      <Link to="/create-user"><p>Create an Account</p></Link>
    </div>
  );
}
