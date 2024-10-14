import { useEffect, useState } from "react"
import { useData } from "../../hooks/useData/useData"
import { useOutletContext, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth/useAuth";
import { API_URL, apiRequest } from "../../utils/api";
import { toast } from "react-toastify";

export default function User() {
    const { userId } = useParams();
    const { data: user, setData: setUser } = useData(`user/${userId}`)
    const auth = useAuth();
    const [inputs, setInputs] = useState({
        displayName: '',
        bio: '',
        pic: null
    })
    const [socket] = useOutletContext();

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

    useEffect(() => {
        if (user) {
            setInputs({
                displayName: user.displayName || '',
                bio: user.bio || ''
            })
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    const handlePicChange = (e) => {
        setInputs((prevData) => ({
          ...prevData,
          pic: e.target.files[0]
        }));
    };

    async function updateProfile(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('displayName', inputs.displayName)
        data.append('bio', inputs.bio)
        data.append('pic', inputs.pic)

        try {
            const res = await apiRequest(`${API_URL}/user/${userId}`, {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                body: data
            })
            socket.emit('updateProfile', res)
            toast.success(res.msg)
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

    if (!user) return 'Loading user details...'

    return (
        <div className='user'>
            <div className='details'>
                {user.profilePicUrl && <img src={user.profilePicUrl} alt={user.username + "'s profile picture"} />}
                <h2>{user.displayName}</h2>
                <p>@{user.username}</p>
                <p>Member since {new Date(user.joined).toLocaleDateString()}</p>
                <p>Currently {user.status}</p>
                {user.bio && (
                    <div style={{whiteSpace: 'pre-wrap'}}>
                        <h3>Bio:</h3>
                        <div>
                            {user.bio}
                        </div>
                    </div>
                )}
            </div>
            {auth.user._id === user._id && (
                <div className='edit'>
                    <h2>Edit profile:</h2>
                    <form action="" method="post" onSubmit={updateProfile} encType="multipart/form-data">
                        <label htmlFor="displayName">
                            Display name:
                            <input 
                                type="text" 
                                id='displayName' 
                                htmlFor='displayName' 
                                name='displayName' 
                                minLength={2} 
                                maxLength={30} 
                                placeholder='John Dough' 
                                value={inputs.displayName} 
                                onChange={handleInputChange}
                            />
                        </label>
                        <label htmlFor="bio">
                            Bio:
                            <textarea 
                                id='bio' 
                                htmlFor='bio' 
                                name='bio' 
                                maxLength={200} 
                                placeholder='Describe yourself in 200 characters or less!' 
                                value={inputs.bio} 
                                onChange={handleInputChange}
                            />
                        </label>
                        <label htmlFor="pic">
                            Profile picture (max 3MB):
                            <input
                                type='file'
                                htmlFor='pic'
                                id='pic'
                                name='pic'
                                onChange={handlePicChange}
                            />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>    
    )
}