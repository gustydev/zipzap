import { useState } from "react"
import { useParams } from "react-router-dom";
import { API_URL, apiRequest } from "../../utils/api";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { useData } from "../../hooks/useData/useData";

export default function Chat() {
    const { chatId } = useParams()
    const { data: chat } = useData(`chat/${chatId}`)
    const auth = useAuth();
    const [message, setMessage] = useState({
        content: '', 
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    async function sendMessage(e) {
        e.preventDefault();
        try {
            await apiRequest(`${API_URL}/chat/${chatId}/message`, {
                method: 'post',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(message)
            })
            location.reload()
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    if (!chat) return 'Loading chat data...'

    return (
        <div className='chat'>
            <h2>{chat.title}</h2>
            <div className="messages">
                {chat.messages.map((msg) => {
                    return (
                        <div key={msg._id}>
                            {msg.postedBy.displayName + ': ' + msg.content}
                        </div>
                    )
                })}
            </div>
            <form action="" method='post' onSubmit={(e) => {sendMessage(e)}}>
                <input type="text" name='content' onChange={(e) => {handleInputChange(e)}}/>
                <button type="submit">SEND</button>
            </form>
        </div>
    )
}