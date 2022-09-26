import React from "react";
import { Helmet } from "react-helmet";

const ChatWidget = ({userID}) => {
    return(
        <div className = "chat_embedding">
            <div className="chat_widget" userid = {userID}></div>
            <Helmet>
            <link href="https://rayyungdev.github.io/react-chat/index.css" rel="stylesheet" />
            <script async src="https://rayyungdev.github.io/react-chat/index.js"></script>
            </Helmet>
        </div> 
    )
}

export default ChatWidget;