import React, { useState, useEffect } from "react"
import { StyledHeader, StyledButton, StyledThisThatButton, StyledLoginMessage, StyledNumberNavComponent } from "../../StyledComponents"
import { GameData } from "../../GameData"
// import { BsChevronRight } from "react-icons/bs"
// import { BsChevronLeft } from "react-icons/bs"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux"

import "./Game.css"
import { Redirect } from "react-router-dom";

const Game = (props) => {

    const [count, setCount] = useState(0)
    const [userResponses, setUserResponses] = useState([])
    const [gameDataLength, setGameDataLength] = useState(0)
    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    toast.configure()

    useEffect(() => setGameDataLength(GameData.length),[])

    useEffect(() => {
        console.log(27,props)
        const loginCheck = props.usernameProp || localStorage.getItem("username")

        if(loginCheck) {
            setIsLoggedIn(true)
            console.log("Loggedin")
        } else {
            setIsLoggedIn(false)
            console.log("Not logged in")
        }
    },[props])

    useEffect(() => {
        let localAnswer = ""

        userResponses.forEach(item => {
            if(item.question === count) {
                localAnswer = item.answer
            }
        })
        // console.log(33, localAnswer)

        setCurrentAnswer(localAnswer)
    },[userResponses, count])

    const handleAddResponse = (index, value) => {
        if(!answeredQuestions.includes(index)) {
            setUserResponses(prev => {
                return [
                    ...prev,
                    {
                        question: index,
                        answer: value
                    }
                ]
            })    
            setAnsweredQuestions(prev => {
                return [
                    ...prev,
                    index
                ]     
            })
        } else {
            toast.error("Already answered")
        }
    }

    const handleFinishGame = () => {        
        if(answeredQuestions.length !== 10) {
            let unansweredQuestions = []
            for(let i=0;i<10;i++) {
                if(!answeredQuestions.includes(i)) {
                    unansweredQuestions.push(i+1)
                }
            }
            toast.warning(`Did not answer the following questions: ${unansweredQuestions.toString()}`)
        } else {
            let user = localStorage.getItem("username")

            const sortFunction = (a,b) => {
                let key1 = parseInt(a.question)
                let key2 = parseInt(b.question)

                if(key1 < key2) return -1;
                if(key2 < key1) return 1;
                return 0
            }
            userResponses.sort(sortFunction)

            if(localStorage.getItem("allUsersGameResults")) {
                let getAllResultsFromStorage = JSON.parse(localStorage.getItem("allUsersGameResults")) 
                getAllResultsFromStorage.push({
                    username: user,
                    userResponses
                })               
                localStorage.setItem("allUsersGameResults", JSON.stringify(getAllResultsFromStorage))
            } else {
                localStorage.setItem("allUsersGameResults", JSON.stringify([{
                    username: user,
                    userResponses
                }]))
            }
            toast.success("Succefully completed the game!")
            toast.success("Check your results and compare",{
                autoClose: false
            })
            setSubmitted(true)
        }
    }

    const handleQuestionNumberClick = (index) => {
        setCount(index)
    }

        return (
            <>
                { isLoggedIn ? 
                <div className="game-root">
                    <StyledHeader>This or That</StyledHeader>
                    <div className="game-question-number">
                        <p>{count+1}</p>
                    </div>
                    <div className="game-button-group">
                        <StyledThisThatButton 
                            thisValue={true} 
                            redBorder={(currentAnswer === GameData[count].thisText)}
                            onClick={() => handleAddResponse(count, GameData[count].thisText)}
                        > 
                            {GameData[count].thisText}
                        </StyledThisThatButton>
        
                        <StyledThisThatButton 
                            thisValue={false}
                            redBorder={(currentAnswer === GameData[count].thatText)} 
                            onClick={() => handleAddResponse(count, GameData[count].thatText)}
                        >
                            {GameData[count].thatText}
                        </StyledThisThatButton>
                    </div>
        
                    <div className="game-nav-buttons">
                        { count>0 && <StyledButton onClick={() => setCount(count-1)} title="previous Question" signin={true}>Prev</StyledButton> }
                        { count<gameDataLength-1 && <StyledButton onClick={() => setCount(count+1)} title="next Question" signin={false}>Next</StyledButton>}
                    </div>
                    
                    <div className="allQuestionNumbers">
                        {GameData.map((item,index) => {
                            return (
                                <StyledNumberNavComponent key={index} onClick={() => handleQuestionNumberClick(index)} answered={answeredQuestions.includes(index)}>
                                    <p>{index+1}</p>
                                </StyledNumberNavComponent>
                            )
                        })}
                    </div>

                    <div>
                        {(!submitted) && <StyledButton thisValue={false} className="finishGame-button" onClick={handleFinishGame}>Finish game</StyledButton>}
                    </div>
                </div>
                :
                <StyledLoginMessage>Please login</StyledLoginMessage>}
            </>
        ) 
}

const mapStateToProps = state => {
    return {
        usernameProp : state.username
    }
}

export default connect(mapStateToProps, null)(Game);