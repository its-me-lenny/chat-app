import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const date = new Date(message.date.seconds * 1000).toLocaleDateString();
  const time = new Date(message.date.seconds * 1000).toLocaleTimeString();

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && (
          <img src={message.img} alt={`image sent by: ${message.senderId}`} />
        )}
      </div>
    </div>
  );
};

export default Message;
