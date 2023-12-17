import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateUser(){
    
    // Use State
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [postResponse, setPostResponse] = useState("")

    // navigation
    const navigate = useNavigate()

    // Handlers
    const handleOnChange = (evt) => {
        const {name, value} = evt.target
        setFormData((prevData) => {
            return{
                ...prevData, 
                [name]:value
            }
        })
    }

    const handleRegistration = (message) => {
        return message == "Successful Registration" ? navigate("/") : console.log("no")
    }
    const postToDb = async (user) => {
        const postUser = {...user } ;
        await axios
            .post ("http://localhost:3001/register", postUser)
            .then ((response) => setPostResponse(<p>{response.data}</p>))
        
        };
    // Post
    const postUser = async(evt) => {
        evt.preventDefault()
        // await axios.post("http://localhost:3001/register", formData)
        // .then((response) => setPostResponse(<p>{response}</p>))
        postToDb(formData)
        setFormData({
            username:"",
            password:"",
        })
    }

    // Register form
    return(
        <div action="" onSubmit={postUser}>
            
            <button onClick={() => navigate("/")}>Return to Login</button>

            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleOnChange} value={formData.username} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleOnChange} value={formData.password} required />

                <button onClick={() => handleRegistration(postResponse)}>Register</button>
            </form>
            {postResponse}
        </div>
    )
}