import React, { useState, useEffect } from "react"
import { StyledNavSingleComponent } from "../../StyledComponents";
import { useHistory } from "react-router-dom"

import "./NavBar.css"

const NavBar = () => {

    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        let user = localStorage.getItem("username")

        if(user) {
            setIsLoggedIn(true)
        }
    },[])

    const handleLinkClick = e => {
        let name = e.target.name
        if(name === "game") {
            history.push("/game")
        } else if(name === "results") {
            history.push("/results")
        } else if(name === "login") {
            history.push("/")
        }
    }

    const handleLogout = () => {
        localStorage.setItem("username", "")
        history.push("/")
        setIsLoggedIn(false)
    }

    return (
        <div className="nav-root">
            <div className="nav-content">
                <StyledNavSingleComponent button={false} name="game" onClick={handleLinkClick}>Game</StyledNavSingleComponent>
                <StyledNavSingleComponent button={false} name="results" onClick={handleLinkClick}>Results</StyledNavSingleComponent>
                { isLoggedIn ? 
                    <StyledNavSingleComponent button={true} name="logout" onClick={handleLogout}>Logout</StyledNavSingleComponent>
                        :
                    <StyledNavSingleComponent button={true} name="login" onClick={handleLinkClick}>Login</StyledNavSingleComponent>
                }
            </div>
        </div>
    )
}

export default NavBar;