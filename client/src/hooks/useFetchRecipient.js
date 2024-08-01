import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    console.log("USER", chat?.user._id, chat?.chat?.members)
    const recipientId = chat?.chat?.members?.find(id => id !== chat?.user?._id)

    useEffect(() => {
        const getUser = async () => {
            console.log("recipientId", recipientId)
            if(!recipientId) return null

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)

            if(response.error) {
                return setError(response)
            }

            setRecipientUser(response)
        }

        getUser()
    }, [recipientId])
    
    return {recipientUser}
}