import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessageLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  console.log("messages", messages)

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log("Error fetching users", response);
      }

      console.log(response)

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        
        if(user === null) {
          console.info("User is not set")
          return;
        }

        if (user._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      console.log("GET MESSAGES")

      setMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessageLoading,
        messagesError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
