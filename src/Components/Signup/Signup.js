import React, { useState, useEffect } from "react"
import { StyledButton, StyledInput, StyledHeader } from "../../StyledComponents"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiChevronDoubleRight } from "react-icons/hi"

import "./Signup.css"
import { Link } from "react-router-dom";

const Signup = () => {

    const [inputData, setInputData] = useState({
        username: "",
        password: "",
        repeatPassword: ""
    })
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    
    toast.configure() 

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

    useEffect(() => {
        if(inputData.repeatPassword.length > 0) {
            if(inputData.repeatPassword !== inputData.password) {
                setPasswordMismatch(true)
            } else {
                setPasswordMismatch(false)
            }
        }
    },[inputData.repeatPassword])

    const handleSignup = () => {
        let { username, password, repeatPassword } = inputData

        if(username.length > 0 && password.length > 0) {
            if(repeatPassword !== password) {
                toast.error("Passwords did not match")
            } else {

                if(localStorage.getItem("users-info")) {
                    let userInfoFromStorage = JSON.parse(localStorage.getItem("users-info"))

                    if(userInfoFromStorage[inputData.username]) {
                        toast.error("Username not available")
                    } else {
                        userInfoFromStorage[inputData.username] = inputData.password
                        localStorage.setItem("users-info", JSON.stringify(userInfoFromStorage))
                        toast.success("Successfully signed up")
                    }
                } else {
                    let setDataToStorage = JSON.stringify({
                        [inputData.username] : inputData.password
                    })

                    localStorage.setItem("users-info", setDataToStorage)
                    toast.success("Successfully signed up")
                }
            }
        }
    }

    return (
        <div className="signup-root">
            <StyledHeader>Sign up</StyledHeader>
            <div className="signup-content">
                <div className="signup-singleDiv">
                    <p>Enter username</p>
                    <StyledInput type="text" onChange={handleInputChange} name="username" value={inputData.username}/>
                </div>
                <div className="signup-singleDiv">
                    <p>Enter password</p>
                    <StyledInput type="password" onChange={handleInputChange} name="password" value={inputData.password}/>
                </div>
                <div className="signup-singleDiv">
                    <p>Enter password, again</p>
                    <StyledInput type="password" onChange={handleInputChange} name="repeatPassword" value={inputData.repeatPassword} passwordMismatch={passwordMismatch}/>
                </div>
                <StyledButton onClick={handleSignup} signin={false}>Sign up</StyledButton>
                <Link to="/" className="signup-link">Login<span><HiChevronDoubleRight /></span></Link>
            </div>
        </div>
    )
}

export default Signup;