import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { API_URL, apiRequest } from "../../utils/api";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";

export default function Chat() {
    const [data, setData] = useState(null);
    const { chatId } = useParams()
    const auth = useAuth();
    const [message, setMessage] = useState({
        content: '', 
    })
    console.log(message, data)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const data = await apiRequest(`${API_URL}/chat/${chatId}`)
                setData(data);
            } catch (error) {
                console.error(error)
            }
        }

        if (!ignore) fetchData()

        return () => {
            ignore = true;
        }
    }, [chatId])

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

    if (!data) return 'Loading chat data...'

    return (
        <div className='chat'>
            <h2>{data.title}</h2>
            <div className="messages">
                {data.messages.map((msg) => {
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