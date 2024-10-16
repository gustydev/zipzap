import { useEffect } from "react"
import { useData } from "../../hooks/useData/useData"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth/useAuth";
import UserDetails from "./UserDetails";
import UserEdit from "./UserEdit";
import { API_URL, apiRequest } from "../../utils/api";
import { toast } from "react-toastify";

export default function User() {
    const { userId } = useParams();
    const { data: user, setData: setUser } = useData(`user/${userId}`)
    const auth = useAuth();
    const [socket] = useOutletContext();
    const nav = useNavigate();

    useEffect(() => {
        socket.on('updateProfile', (data) => {
            if (data.user._id === auth.user._id) {
                setUser(data.user);
            }
        })

        return () => {
            socket.off('updateProfile')
        }
    }, [socket, setUser, auth.user._id])

    async function createDMChat() {
        try {
            const res = await apiRequest(`${API_URL}/chat`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dm: true,
                    recipient: userId
                })
            })
            
            nav(`/chat/${res.chat._id}`)
        } catch (err) {
            console.error(err)
            err.details.forEach((e) => {
                toast.error(e.msg);
            })
        }
    }

    if (!user) return 'Loading user details...'

    return (
        <div className='user'>
            <UserDetails user={user} />
            {auth.user._id === user._id && (
                <UserEdit user={user} socket={socket} />
            )}
            {auth.user._id !== userId && <button onClick={createDMChat}>Start Chat</button>}
        </div>    
    )
}