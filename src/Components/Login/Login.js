import React, { useState, useEffect } from "react"
import { StyledHeader, StyledInput, StyledButton } from "../../StyledComponents"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Login.css"

const Login = (props) => {

    const [inputData, setInputData] = useState({
        username: "",
        password: "",
    })


    const handleInputChange = e => {
        let name = e.target.name
        let value = e.target.value

        setInputData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
        
    }

    toast.configure()

    const handleLogin = () => {
        let allUserDataFromStorage = JSON.parse(localStorage.getItem("users-info"))
        let { username, password } = inputData

        if(username.length > 0 && password.length > 0) {
            if(allUserDataFromStorage) {
                if(allUserDataFromStorage[username]) {
                    if(allUserDataFromStorage[username] === password) {
                        localStorage.setItem("username", username)
                        toast.success("Login successfull")
                        props.history.push("/game")
                    } else {
                        toast.error("Username/password incorrect")
                    }
                } else {
                    toast.error("Username not found, please sign up")
                }
            } else {
                toast.error("Username not found, please sign up")
            }
        }    
    }


    return (
        <div className="signup-root">
            <StyledHeader>Login</StyledHeader>
            <div className="signup-content">
                <div className="signup-singleDiv">
                    <p>Enter username</p>
                    <StyledInput type="text" onChange={handleInputChange} name="username" value={inputData.username}/>
                </div>
                <div className="signup-singleDiv">
                    <p>Enter password</p>
                    <StyledInput type="password" onChange={handleInputChange} name="password" value={inputData.password}/>
                </div>
                
                {/* <div className="login-button-group"> */}
                    <StyledButton onClick={handleLogin} signin={true}>Login</StyledButton>
                    <div className="hz-border">

                    </div>
                    <StyledButton onClick={() => props.history.push("/signup")} signin={false}>Sign up</StyledButton>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Login;
