import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";

function generateDate(dateString) {
  const date = new Date(dateString)
  const options = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  
  return new Intl.DateTimeFormat('de-DE', options).format(date)

}

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
  console.log("CHATBOX", currentChat)
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  console.log(
    "ChatBox recipientUser from useFetchRecipientUser",
    recipientUser
  );

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Select a conversation...
      </p>
    );

  if (isMessagesLoading)
    return <p style={{ textAlign: "center", width: "100%" }}>Loading Chat</p>;

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
              <span>{message.text}</span>
              <span className="message-footer">
                {`${generateDate(message.createdAt)}`}
              </span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
