import { useState, useEffect, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { API_URL, apiRequest } from "../../utils/api";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { useData } from "../../hooks/useData/useData";
import Message from "./Message";

export default function Chat() {
    const { chatId } = useParams()
    const { data: chat, setData: setChat } = useData(`chat/${chatId}`)
    const auth = useAuth();
    const [message, setMessage] = useState({
        content: '',
        attachment: null
    })
    const [socket] = useOutletContext();
    const fileInput = useRef(null);

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

    useEffect(() => {
        socket.on('message', (data) => {
            if (data.chat._id === chatId) {
                setChat(data.chat);
            }
        })

        return () => {
            socket.off('message')
        }
    }, [socket, setChat, chatId])   

    async function sendMessage(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('content', message.content)
        data.append('attachment', message.attachment)

        try {
            const msg = await apiRequest(`${API_URL}/chat/${chatId}/message`, {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
                body: data
            })
            socket.emit('message', msg)
            setMessage((prev) => ({...prev, content: '', attachment: null}))
            fileInput.current.value = ''
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
            <h2>{chat.dm ? chat.members.find((m) => m.member._id !== auth.user._id).member.displayName : chat.title}</h2>
            <div className='messages'>
                {chat.messages.map((msg) => { return <Message msg={msg} key={msg._id}/> })}
            </div>
            <form action="" method='post' onSubmit={sendMessage} encType="multipart/form-data">
                <input type="text" name='content' onChange={handleInputChange} value={message.content} maxLength={250}/>
                <input type="file" name='attachment' onChange={handleFileChange} ref={fileInput} />
                <button type="submit">SEND</button>
            </form>
        </div>
    )
}