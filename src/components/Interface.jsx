import React, {useState, useEffect} from "react";
import '../static/style.css'
import UpdateModal from "./Modals/UpdateModal"
import ChatWidget from "./Interface_Components/ChatWidget";
import { authFetch } from "../react-token-auth";
import NewUser from "./Interface_Components/NewUser";

const Interface = ({handleLogout}) => {
    const [updateAnswers, showUpdateAnswer] = useState(false)
    const [userID, setUserID] = useState('')
    const[hasResponses, sethasResponses] = useState('')
    const FirstInput = '<div className="chat_widget userid=' + userID + '></div>'

    const handleShowUpdate = () => {
        showUpdateAnswer(!updateAnswers)
    }
    const retrieve_info =() => {
        authFetch("/api/get_info").then(
            response => {
                if (response.status === 401){
                    alert('Something went wrong...')
                }
                return response.json()
            }
        ).then(
            response => {
                if (response && response.message){
                    setUserID(response.message.userID)
                    sethasResponses(response.message.hasResponses)
                    if (response.message.hasResponses === false){
                        handleShowUpdate()
                    }
                }
            }
        )
    }

    useEffect(() => {
        retrieve_info()
    }, [])

    if (userID){
    return (
        <>
        <button onClick={handleLogout} className> Logout </button>
        <div className = "wrapper">
            <div className = "top_wrapper"> 
                <h3> Interview-Bot Demo</h3>
                <UpdateModal show = {updateAnswers} close = {handleShowUpdate} /> 
                {hasResponses? 
                <ChatWidget userID = {userID}/>
                :
                <NewUser/>}
                <button onClick={handleShowUpdate} className = "update_button"> Update Answers </button>
            </div>
            
            <div className = "bottom_thing"> 
                <div><b>Copy and Paste the following into your HTML</b></div>
                <div><code> {FirstInput} </code> </div>
                <div><code> {String('<link href="https://rayyungdev.github.io/react-chat/index.css" rel="stylesheet" />')} </code></div>
                <div><code> {String('<script async src="https://rayyungdev.github.io/react-chat/index.js"></script>')} </code></div>
            </div>
        </div>
        </>
    )
    }
}

export default Interface
