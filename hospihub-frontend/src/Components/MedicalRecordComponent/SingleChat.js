import React, { useEffect, useState } from 'react';
import './chatbox.css';
import SideNavBarUpdateProfile from '../HomeComponent/sideNavbarUpdateProfile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import ScrollableChat from './ScrollableChat';
function SingleChat() {
  const [User, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setselectedChat] = useState({});
  var decodedToken = jwt_decode(token);
  const selectedUser = useSelector((state) => 
  state.userSelectedSlice.selectedUser);
  const selectedReceiver=useSelector((state)=>
  state.userSelectedSlice.selectedReceiver)
    useEffect(() => {
        axios
          .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
          .then((response) => {
            setUser(response.data);           
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
      useEffect(() => {
        axios
            .post("http://localhost:5000/chat/getChat",{ 
              userConnectedId:decodedToken.id,
              userReceivedId:selectedReceiver._id
            })
            .then((response) => {
              setselectedChat(response.data);    
            })
            .catch((error) => {
              console.error(error);
            });
        }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: newMessage }]);
    setNewMessage('');
  };

  const sendMessage=async()=>{ 
    try{ 
       
        const data=await axios 
        .post("http://localhost:5000/message/sendMessage",{ 
            content:newMessage, 
            chatId:selectedChat[0]._id,
            userConnectedId:decodedToken.id
        });   
        setMessages([...messages, { text: data.data.content }]);
      
    }catch(error){ 
        console.log(error.message)
    }
   
  }

  const fetchMessages=async()=>{ 
    const chatId=selectedChat[0]._id
  
    try{ 
      const data=await axios.get(`http://localhost:5000/message/${chatId}`);
      const contents = data.data.map((message) => message.content);
      setMessages(contents)
    }catch(err){ 
      console.log(err.message);
    }
  }
  useEffect(()=>{ 
    fetchMessages();
  },[selectedChat])


  return (
    <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarUpdateProfile user={User}></SideNavBarUpdateProfile>
          </div>
    <div className="App">
      <h1>{selectedUser}</h1>
      <div className="messages">
       <ScrollableChat messages={messages}/>
      </div>
      <form onSubmit={handleSubmit} className='formChat'>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit" onClick={sendMessage}>Send</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default SingleChat;
