import ScrollableFeed from "react-scrollable-feed";
import jwt_decode from "jwt-decode";
import "./chat.css"
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
  } from "./ChatLogic";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

function ScrollableChat({messages}) {
   // console.log("messsage"+JSON.stringify(messages, null, 2))
    const token = localStorage.getItem("jwtToken");  
    var decodedToken = jwt_decode(token);
    // const [user, setUser] = useState({});
    // useEffect(() => {
    //   // var user=  axios
    //   //     .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
    //   //     .then((response) => {
    //   //       setUser(response.data); 
    //   //     })
    //   //     .catch((error) => {
    //   //       console.error(error);
    //   //     });
    //   // }, []);
    return ( 
        <> 
        
       
        <div className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.sender && message.sender._id === decodedToken.id
              ? "chat-bubble right"
              : "chat-bubble left"
          }
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
    
        </>
     );
}

export default ScrollableChat;