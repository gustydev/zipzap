import { useEffect } from "react"
import { useData } from "../../hooks/useData/useData"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth/useAuth";
import UserDetails from "./UserDetails";
import UserEdit from "./UserEdit";
import { API_URL, apiRequest } from "../../utils/api";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import FetchError from "../error/FetchError";

export default function User() {
    const { userId } = useParams();
    const { data: user, setData: setUser, loading, error } = useData(`user/${userId}`)
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
            const dm = await apiRequest(`${API_URL}/chat/dm/${userId}`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            
            if (dm) {
                nav(`/chat/${dm._id}`)
                return;
            }

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

    if (loading) return <Loading/>
    if (error || !user) return <FetchError error={error} />

    return (
        <div className='user'>
            <UserDetails user={user} />
            {auth.user._id === user._id && auth.user.demo ? (
                <div>Create a free account to customize your profile, including your display name, bio and profile picture</div>
            ) : (
                auth.user._id === user._id && <UserEdit user={user} socket={socket} />
            )}
            {auth.user._id !== userId && !auth.user.demo && <button onClick={createDMChat} className='btn btn-primary'>Start Chat</button>}
        </div>    
    )
}