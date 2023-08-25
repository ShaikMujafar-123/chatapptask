import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addChat } from "../../redux/slice";

const Chat = () => {
  const newChats = useSelector((state) => state.Chat);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [receiverMsg, setReceiveMsg] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
    setUsers(storedUsers);

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
        messageId: generateMessageId(loggedInUser.username),
        sender: loggedInUser.username,
        receiver: selectedUser.username,
        content: messageInput,
        timestamp: new Date().toLocaleString(),
      };

      const updatedUsers = users.map((user) => {
        if (
          user.username === loggedInUser.username ||
          user.username === selectedUser.username
        ) {
          return {
            ...user,
            messages: [...user.messages, chatMessage],
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      dispatch(addChat(updatedUsers));
      localStorage.setItem("Users", JSON.stringify(updatedUsers));
      setMessageInput("");

      setSelectedUser(
        updatedUsers.find((user) => user.username === selectedUser.username)
      );
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

  return (
    <div className="chat-app">
      {/* User list */}
      <div className="user-list">
        <h2>Contacts</h2>
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

      {/* chat Area  */}
      <div className="chat-area">
        <div className="header-chat">
          <div>
            {loggedInUser &&
              loggedInUser.login_status === "login" &&
              loggedInUser.username}
          </div>
          <div onClick={handleLogout}>Logout</div>
        </div>
        {selectedUser ? (
          <>
            <div className="header">{selectedUser.username}</div>
            <div className="messages">
              {selectedUser.messages.map((message, index) => (
                <div
                  key={message.messageId}
                  className={`message ${
                    message.sender === selectedUser.username
                      ? "received"
                      : "sent"
                  }`}
                >
                  {/* {
                    <span style={{ fontWeight: "500", color: "bold" }}>
                      {message.sender === selectedUser.username
                        ? message.sender
                        : "You"}
                    </span>
                  } */}
                  {message.messageId.includes(loggedInUser.username) && (
                    <>
                      {console.log(selectedUser, "selectedUser")}
                      {
                        <span style={{ fontWeight: "500", color: "bold" }}>
                          {message.sender === selectedUser.username
                            ? message.sender
                            : "You"}
                        </span>
                      }
                      <p>{message.content}</p>
                      <span>{message.timestamp}</span>
                    </>
                  )}
                  <div>
                    {/* {receiverMsg.length > 0 && (
                  <div>
                    {receiverMsg.map((msg, index) => (
                      <p key={index}>
                        {msg &&
                          msg.sender === selectedUser.username &&
                          msg.content}
                      </p>
                    ))}
                  </div>
                )} */}
                    {/* taking messages array form selected user (MUjafar) */}

                    {message.receiver === loggedInUser.username &&
                      selectedUser.username === message.sender && (
                        <>
                          {console.log(message.sender, "message.sender")}
                          {
                            <span style={{ fontWeight: "500", color: "bold" }}>
                              {message.receiver === loggedInUser.username
                                ? message.sender
                                : "You"}
                            </span>
                          }

                          <p>{message.content}</p>
                          <span>{message.timestamp}</span>
                        </>
                      )}
                  </div>
                </div>
              ))}
            </div>

            <div></div>
            <div className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>No Contacts to display</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
