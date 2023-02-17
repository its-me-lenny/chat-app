import cam from "../img/cam.png";
import add from "../img/add.png";
import more from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { capitalize } from "../utils/helper";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        {data && <span>{capitalize(data.user.displayName)}</span>}
        <div className="chatIcons">
          <img src={cam} alt="cam-image" />
          <img src={add} alt="add-image" />
          <img src={more} alt="more-image" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
