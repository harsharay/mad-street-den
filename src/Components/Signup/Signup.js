import React, { useState, useEffect } from "react"
import { StyledButton, StyledInput, StyledHeader } from "../../StyledComponents"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcInfo } from "react-icons/fc"

import "./Signup.css"
import { Link } from "react-router-dom";

const Signup = (props) => {

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

        if(username.length > 0 && password.length >=5) {
            if(repeatPassword !== password) {
                toast.error("Passwords did not match",{
                    autoClose: 3000
                })
            } else {

                if(localStorage.getItem("users-info")) {
                    let userInfoFromStorage = JSON.parse(localStorage.getItem("users-info"))

                    if(userInfoFromStorage[inputData.username]) {
                        toast.error("Username not available",{
                            autoClose: 3000
                        })
                    } else {
                        userInfoFromStorage[inputData.username] = inputData.password
                        localStorage.setItem("users-info", JSON.stringify(userInfoFromStorage))
                        toast.success("Successfully signed up",{
                            autoClose: 2000
                        })
                        props.history.push("/")
                    }
                } else {
                    let setDataToStorage = JSON.stringify({
                        [inputData.username] : inputData.password
                    })

                    localStorage.setItem("users-info", setDataToStorage)
                    toast.success("Successfully signed up",{
                        autoClose: 2000
                    })
                    props.history.push("/")
                }
            }
        } else if(password.length <5) {
            toast.error("Password should be min of 5 character length",{
                autoClose: 3000
            })
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
                <div className="password-alert-block">
                    <p className="password-alert"><FcInfo />Password should be min of 5 characters length</p>
                </div>
                <div className="signup-singleDiv">
                    <p>Enter password, again</p>
                    <StyledInput type="password" onChange={handleInputChange} name="repeatPassword" value={inputData.repeatPassword} passwordMismatch={passwordMismatch}/>
                </div>
                <StyledButton onClick={handleSignup} signin={false} fullOpacity={true}>Sign up</StyledButton>
                <div className="hz-border"></div>
                <StyledButton onClick={() => props.history.push("/")} signin={true} fullOpacity={true}>Login</StyledButton>
            </div>
        </div>
    )
}

export default Signup;