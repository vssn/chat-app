import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const potentialChats = () => {
  const { potentialChats } = useContext(ChatContext);
  console.log("PotentialChats", potentialChats);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((user, index) => 
            <div className="single-user" key={index}>
              {user.name}
              <span className="user-online"></span>
            </div>
          )}
      </div>
    </>
  );
};

export default potentialChats;
