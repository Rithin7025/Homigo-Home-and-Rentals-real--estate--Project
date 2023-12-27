import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Conversations from "./Conversations";
import Message from "./Message";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
const socket = io.connect("http://localhost:3000");

function Messenger() {
  const { ownerId } = useParams();

  console.log(ownerId);
  const [converstaion, setConversation] = useState([]);
  const [convoId, setConvoId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  //to make the chat component automatically scroll
  const scrollRef = useRef();

  //function to set the currentChat and the owner info
  const handleConversationClick = async (clickedConversation) => {
    console.log(clickedConversation,'❤️❤️')
    try {
      
    const conversationId = clickedConversation._id
    setCurrentChat(clickedConversation);
    setConvoId(clickedConversation._id);
    //newcode
    if(socket){
      socket.emit('joinRoom',clickedConversation._id)
    }
    
    const ownerId = clickedConversation.members.find(
      (user) => user !== currentUser._id
    );
    
    const response = await axios.get(`/api/user/getUser/${ownerId}`)
    
    if (response) {
      setOwner(response.data);
      console.log(response.data);
    }
    
    //updating all messages to read
    const updateMessagesToRead = await axios.get(`/api/message/getUserMessages/mark-as-read/${conversationId}`)
    
    console.log(updateMessagesToRead)
    
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      if (!ownerId) {
        const res = await axios.get(
          `/api/conversation/getUserConversation/${currentUser._id}`
        );
        setConversation(res.data);
      }
    };
    fetchConversations();
  }, []);

  //to fecth the conversations of a user(chats)
  useEffect(()=>{
    const fetchOwner = async() => {

      //finding the owner in the header
      if(ownerId){
        const response = await axios.get(`/api/user/getUser/${String(ownerId)}`);
        if (response) {
          setOwner(response.data);
          console.log(response.data);
        }
        const conversationId = await axios.get(
          "/api/conversation/getConversationId",
          { params: { senderId: currentUser._id, receiverId: ownerId } }
        );

         //doing the same as the fetchMessages
      setCurrentChat(conversationId.data);
          
      if (conversationId.data._id) {
        const res = await axios.get(
          `/api/message/getUserMessages/${currentChat?._id}`
        );

        console.log(res.data);
        setMessage(res.data);
        if (res) {
          //set messages fetched from db
          console.log(message);
        }
      }
      } 
    }
    fetchOwner();
  },[currentUser._id])


  useEffect(() => {
    const fetchConversations = async () => {
      
      const res = await axios.get(
        `/api/conversation/getUserConversation/${currentUser._id}`
      );
      setConversation(res.data);

      //setting the message with the owner if there is previous chat
      //api to find out the conversation id
      console.log(ownerId,currentUser._id)
      
    };
    fetchConversations();
  }, [currentUser._id,message]);

  console.log(currentChat);
  //to fetch user messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `/api/message/getUserMessages/${currentChat?._id}`
        );
        if (res) {
          //set messages fetched from db
          setMessage(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentChat]);

  //function to handle send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    


    //check if there
    if (!currentChat) {
      const res = await axios.post("/api/conversation/newConversation", {
        senderId: currentUser._id,
        receiverId: ownerId,
      });
      console.log(res.data,'🍉🍉🍉')
      console.log(res.data._id,'🍉🍉🍉')
      
      if (res) {
        setCurrentChat(res.data);
        setConvoId(res.data._id)
        socket.emit('joinRoom',res.data._id)
      }
    }

    const messageTosend = {
      sender: currentUser._id,
      conversationId: currentChat._id,
      text: newMessage,
    };
    //finding the receiver
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    //socket io
   
    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
      conversationId : convoId
    });

    try {
      const res = await axios.post("/api/message/newMessage/", messageTosend);
      if (res) {
        setMessage([...message, res.data]);
      }

      setNewMessage("");
    } catch (error) {}
  };

  useEffect(() => {
    //    //socket io (emit event with user id)

    socket.emit("addUser", currentUser?._id);

    //listening the event to get the users connected
    socket.on("getUsers", (users) => {
      console.log(users);
    });
  }, []);

  //listening the event from server after the message has been sent from backend
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //any change in the arrival message we update messages
  useEffect(() => {
    //validating here that any other person other than the current chat owner couldn't see the coming messages
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //to scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <div className="">
      <div className="flex flex-row h-full">


        {/**left div to display chats(contacts) */}
        <div className="w-3/5 p-3 border-r-2 bg-neutral-100 h-[555px]  border-slate-400 overflow-scroll overflow-x-hidden">
          <div className="">
            <p className="text-xl font-semibold p-2 flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
              Chats
            </p>
            <input
              type="text"
              className="p-2 mb-2 mt-2 rounded-lg  right w-full focus:outline-none border-slate-800  border-b-[1px]"
              placeholder="search users"
            />

            {converstaion.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => handleConversationClick(conversation)}
              >
                <Conversations owner={owner?._id} conversation={conversation} />
              </div>
            ))}
          </div>
        </div>
        {/**right div header and messages */}
        {/**header */}

        <div className="w-full">
         
         {
          owner ? 

          <>
                     
          <div className="bg-neutral-400 w-full mb-3  h-16">
            <div className="flex items-center ml-5 p-3 gap-4">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={owner?.avatar}
                alt=""
              />

              <div className="flex flex-col">
                <p className="text-lg font-semibold text-white">
                  {owner?.userName}
                </p>
                <span className="text-xs"></span>
              </div>
            </div>
          </div> 

           <div className="h-[420px] overflow-scroll  overflow-x-hidden flex flex-col">
            {currentChat ? (
              <div className="w-full h-[500px]">
                {message.map((mesg) => (
                  <div ref={scrollRef}>
                    <Message
                      key={mesg.conversationId}
                      message={mesg}
                      isOwn={mesg.sender === currentUser._id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div> 
          {/**send message */}

           <div className="flex gap-2 mt-3 justify-between">
            <textarea
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              id="text"
              cols="30"
              className=" w-full rounded-lg h-12 p-3 focus:outline-none"
              placeholder="Message"
              rows="10"
            ></textarea>
            <button
              type="button"
              className="p-3 bg-blue-700 rounded-lg text-white font-semibold mr-4 hover:bg-blue-500"
              onClick={handleSubmit}
            >
              send
            </button>
          </div> 
          </>  :

          <>
            <div className="bg-white h-full flex items-center justify-center flex-col">
             
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-[90px] h-[90px] text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg>
<h1 className="text-xl font-semibold">Homigo Connect</h1>
<p className="text-slate-600 text-xs"> send and receive messages without keeping your phone online</p>
  
            </div>
          </>


          
         }



        </div>
      </div>



    </div>
  );
}

export default Messenger;
