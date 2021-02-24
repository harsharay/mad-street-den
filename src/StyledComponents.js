import styled from "styled-components"


export const StyledButton = styled.button`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  background: ${(props) => props.signin ? "#f3a01f" : "#1c1c28"}; 
  color: ${(props) => props.signin ? "#1c1c28" : "#f3a01f"};   
  font-size: 16px;
  font-weight: 700;
  border: none;
  outline: none;
  padding: 14px 28px;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 0.5px;
//   width: 25.5%;
`

export const StyledInput = styled.input`
    border: ${(props) => props.passwordMismatch ? "2px solid red" : "2px solid gray"};
    padding: 6%;
    outline: none;
    border-radius: 5px;
    font-size: 18px
`

export const StyledHeader = styled.p`
    font-size: 24px;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.5px;
`

export const StyledThisThatButton = styled.button`
    font-size: 20px;
    font-family: 'Lato', sans-serif;
    background: ${props => props.thisValue ? "#4141a5" : "#fd5056"};  
    // color: ${props => props.thisValue ? "white" : "white"};
    color: white;
    font-size: 32px;
    font-weight: 700;
    border: none;
    outline: none;
    padding: 20px 40px;
    border-radius: 5px;
    cursor: pointer;
    letter-spacing: 0.5px;
    border: ${props => props.redBorder ? "5px solid #60af7d" : ""};
`

export const StyledSelectComponent = styled.select`
    padding: 10px;
    font-size: 24px;
    font-weight: 700;
    border: 2px solid #f3a01f;
    border-radius: 5px;
    outline: none;
    width: fit-content;
`
export const StyledNavSingleComponent = styled.a`
    font-size: 22px;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    color: ${props => props.button ? "white" : "black"};;
    background: ${props => props.button ? "black" : ""};
    text-decoration: none;
    padding: 2% 10%; 
    border-radius: 5px;
    cursor: pointer;
`
 