import { useState, useEffect, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { API_URL, apiRequest } from "../../utils/api";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { useData } from "../../hooks/useData/useData";
import Message from "./Message";
import handleInputChange from "../../utils/handleInputChange";
import Loading from "../loading/Loading";
import DMDetails from "./DMDetails";
import FetchError from "../error/FetchError";

export default function Chat() {
    const { chatId } = useParams()
    const { data: chat, setData: setChat, loading, error } = useData(`chat/${chatId}`)
    const auth = useAuth();
    const [message, setMessage] = useState({
        content: '',
        attachment: null
    })
    const [socket] = useOutletContext();
    const fileInput = useRef(null);

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

    if (loading) return <Loading/>
    if (error || !chat) return <FetchError data='chat' id={chatId}/>
    if (!chat.public && !chat.members.find((m) => m.member._id === auth.user._id)) return 'Error: you are not allowed to see this private chat.'
    
    return (
        <div className='chat'>
            {chat.dm ? (
                <div className="d-flex gap-2 mb-2 align-items-center">
                    <DMDetails chat={chat} auth={auth}/>
                </div>
            ) : <h2>{chat.title}</h2>}
            {!chat.dm && <span>{chat.members.length + (chat.members.length === 1 ? ' member' : ' members')}</span>}
            <div className='messages'>
                <div>{chat.messages.map((msg) => { return <Message msg={msg} key={msg._id}/> })}</div>
            </div>
            <form action="" method='post' onSubmit={sendMessage} encType="multipart/form-data" className='d-flex flex-column gap-1'>
                <div style={{display: 'flex', width: '100%'}} className='gap-1'>
                    <input style={{flexGrow: 1}} type="text" name='content' onChange={(e) => {handleInputChange(e, setMessage)}} value={message.content} maxLength={250}/>
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
                <input type="file" name='attachment' onChange={handleFileChange} ref={fileInput} className={auth.user.demo ? 'hidden' : ''}/>
            </form>
        </div>
    )
}