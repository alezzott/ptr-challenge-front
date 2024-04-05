import styled from "styled-components";

export const ContentRegister = styled.div `
background-color: #fff;
border: 1px solid black;
border-radius: 8px;
width: 50%;
padding: 20px;
margin: 0 auto;
color: '#302E45';
`


export const TitleRegister = styled.h1 `
font-size: 14px;
`

export const ButtonRegister = styled.button`
    color: white;
    background-color: #4F46BB;
    border-radius: 50px;
    padding: 10px 20px; 
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-top: 15px;
    

    &:hover {
        background-color: #3b3391; 
    }

    &:focus {
        outline: none;
    }
`;
