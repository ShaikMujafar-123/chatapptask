import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);


  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
    setUsers(storedUsers);
    const localstorageMessages =
      JSON.parse(localStorage.getItem("Messages")) || [];
    setMessages(localstorageMessages);

    const userWithoutLogin = storedUsers.find(
      (user) => user.login_status !== "login"
    );
    if (userWithoutLogin) {
      setSelectedUser(userWithoutLogin);
    }
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const generateMessageId = (sender) => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${sender}_${timestamp}_${random}`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "" && selectedUser) {
      const loggedInUser = users.find((user) => user.login_status === "login");
      const chatMessage = {
        sender: loggedInUser.username,
        receiver: selectedUser.username,
        content: messageInput,
        timestamp: new Date().toLocaleString(),
      };

      const updateMessages = [...messages, chatMessage];

      setMessages(updateMessages);
      // dispatch(addChat(updatedUsers));
      localStorage.setItem("Messages", JSON.stringify(updateMessages));
      setMessageInput("");

      // setSelectedUser(
      //   updatedUsers.find((user) => user.username === selectedUser.username)
      // );
    }
  };

  const handleLogout = () => {
    const updatedLocalData = users.map((userData) =>
      userData.login_status === "login"
        ? { ...userData, login_status: "" }
        : userData
    );

    localStorage.setItem("Users", JSON.stringify(updatedLocalData));

    navigate("/");
  };

  // Find the currently logged-in user

  const loggedInUser = users.find((user) => user.login_status === "login");
  console.log(loggedInUser, "loggedInUser");
  // Define filteredMessages based on the logged in user and selected user
  const filteredMessages = messages.filter(
    (message) =>
      (message.sender === loggedInUser?.username &&
        message.receiver === selectedUser?.username) ||
      (message.sender === selectedUser?.username &&
        message.receiver === loggedInUser?.username)
  );

  return (
    <div className="chat-app">
      {/* User list */}
      <div className="user-list">
        <div className="user-list-header">
          <h2>Contacts</h2>
        <div>Create a Group</div>
        </div>
        
        <ul>
          {users
            .filter((user) => user.login_status !== "login")
            .map((user, index) => (
              <li
                key={index}
                className={
                  selectedUser && user.email === selectedUser.email
                    ? "active"
                    : ""
                }
                onClick={() => handleUserClick(user)}
              >
                {user.username}
              </li>
            ))}
        </ul>
      </div>

      {/* Chat content */}
      <div className="chat-content">
        <div className="chat-header">
          <div>{loggedInUser && loggedInUser.username}</div>
          <div onClick={handleLogout}>Logout</div>
        </div>

        <div className="msg-header">
          <div>{selectedUser && selectedUser.username}</div>
        </div>

        <div className="message-list">
          <div className="messages-container">
            {filteredMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === loggedInUser?.username
                    ? "sent"
                    : "received"
                }`}
              >
                <span style={{ fontSize: "15px" }}>
                  {message.sender === loggedInUser?.username ? (
                    <p>You</p>
                  ) : (
                    <p>{message.sender}</p>
                  )}
                </span>
                <p>{message.content}</p>
                <span>{message.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="message-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
