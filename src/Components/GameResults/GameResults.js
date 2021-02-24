import React,{ useState, useEffect } from "react"
import { StyledButton, StyledHeader, StyledSelectComponent } from "../../StyledComponents"

import "./GameResults.css"

const GameResults = () => {

    const [allUserResults, setAllUserResults] = useState([])
    const [selectUsers, setSelectUsers] = useState({
        firstUser: "",
        secondUser: ""
    })
    const [firstUserData, setFirstUserData] = useState({})
    const [secondUserData, setSecondUserData] = useState({})
    const [compatibilityScore, setCompatibilityScore] = useState(0)

    useEffect(() => {
        if(localStorage.getItem("allUsersGameResults")) {
            let dataFromStorage = JSON.parse(localStorage.getItem("allUsersGameResults"))
            setAllUserResults(dataFromStorage)
        }
    },[])

    useEffect(() => {
        if(allUserResults.length > 0) {
            setSelectUsers(prev => {
                return {
                    ...prev,
                    firstUser: allUserResults[0].username,
                    secondUser: allUserResults[0].username, 
                }
            })
        }
    },[allUserResults])

    const handleDropdownChange = e => {
        let name = e.target.name
        let value = e.target.value

        setSelectUsers(prev => {
            return {
                ...prev,
                [name] : value
            }
        })

        setFirstUserData({})
        setSecondUserData({})
    }

    const handleViewComparision = () => {
        let fUserData = {}
        let sUserData = {}

        allUserResults.forEach(item => {
            if(item.username === selectUsers.firstUser) {
                fUserData = {...item}
            }
        })

        allUserResults.forEach(item => {
            if(item.username === selectUsers.secondUser) {
                sUserData = {...item}
            }
        })

        setFirstUserData(fUserData)
        setSecondUserData(sUserData)
    }

    const calculateCompatibilty = () => {

        let totalMatchedCount = 0

        if(Object.keys(firstUserData).length > 0) {
            firstUserData.userResponses.forEach((item, index) => {
                if(item.answer === secondUserData.userResponses[index].answer) {
                    totalMatchedCount++
                }
            })
        }

        setCompatibilityScore(totalMatchedCount)
    }

    useEffect(() => calculateCompatibilty(),[firstUserData])

    return (
        <div>
            <StyledHeader>Compare the results</StyledHeader>
            <div className="results-block">
                { allUserResults.length > 0 ?  
                        <>
                            <div className="results-content">
                                <StyledSelectComponent onChange={handleDropdownChange} name="firstUser" value={selectUsers.firstUser}>
                                    { allUserResults.map((item,index) => {
                                        return (
                                            <option key={index}>{item.username}</option>
                                        )
                                    }) }
                                </StyledSelectComponent>

                                <StyledSelectComponent onChange={handleDropdownChange} name="secondUser" value={selectUsers.secondUser}>
                                    { allUserResults.map((item,index) => {
                                        return (
                                            <option key={index}>{item.username}</option>
                                        )
                                    }) }
                                </StyledSelectComponent>
                                <StyledButton signin={true} className="results-go-button" onClick={handleViewComparision}>Go</StyledButton>
                            </div>
                        <>
                            { (Object.keys(firstUserData).length > 0 && Object.keys(secondUserData).length > 0) &&
                            <div className="userResult-group">
                                <div className="userResult-block">
                                    <StyledHeader className="userResult-header">{firstUserData.username}'s answers</StyledHeader>
                                    { firstUserData.userResponses.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="singleUserResult" key={index}>
                                                    <p className={(secondUserData.userResponses[index].answer === item.answer) ? "highlightResult" : ""}>{item.answer}</p>
                                                </div>
                                                <hr></hr>
                                            </React.Fragment>
                                        )
                                    }) }
                                </div>

                                <div className="userResult-block">
                                    <StyledHeader className="userResult-header">{secondUserData.username}'s answers</StyledHeader>
                                    { secondUserData.userResponses.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="singleUserResult" key={index}>
                                                    <p className={(firstUserData.userResponses[index].answer === item.answer) ? "highlightResult" : ""}> {item.answer}</p>
                                                </div>
                                                <hr></hr>
                                            </React.Fragment>
                                        )
                                    }) }
                                </div>
                            </div>    
                            }
                        </>
                        { (Object.keys(firstUserData).length > 0 && Object.keys(secondUserData).length > 0) &&
                            <div className="compatibility-score">
                                <p>Compatibility score is:</p> 
                                <div className="compatibility-content">
                                    <p>{compatibilityScore}</p>
                                </div>
                                <p>out of 10</p>
                            </div>
                        }
                    </>
                : 
                    <p>No data</p>}
            </div>
        </div>
    )
}

export default GameResults