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
        attachment: null
    })

    console.log(chat)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setMessage((prevData) => ({
          ...prevData,
          attachment: e.target.files[0]
        }));
    };

    async function sendMessage(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('content', message.content)
        data.append('attachment', message.attachment)

        try {
            await apiRequest(`${API_URL}/chat/${chatId}/message`, {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
                body: data
            })
            location.reload()
        } catch (error) {
            console.error(error)
            if (error.details) {
                error.details.forEach((e) => {
                    toast.error(e.msg)
                })
            } else {
                toast.error(error.message)
            } 
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
                            {msg.attachment && (
                                msg.attachment.type.startsWith('image') ? <img 
                                src={msg.attachment.url} 
                                alt={'attachment posted by ' + msg.postedBy.username} 
                                style={{width: '50px'}}
                                /> : <a href={msg.attachment.url}>Attachment ({msg.attachment.type})</a>
                            )}
                        </div>
                    )
                })}
            </div>
            <form action="" method='post' onSubmit={sendMessage} encType="multipart/form-data">
                <input type="text" name='content' onChange={handleInputChange} maxLength={250}/>
                <input type="file" name='attachment' onChange={handleFileChange} />
                <button type="submit">SEND</button>
            </form>
        </div>
    )
}