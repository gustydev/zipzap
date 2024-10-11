import { useEffect, useState } from "react"
import { useData } from "../../hooks/useData/useData"
import { useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth/useAuth";
import { API_URL, apiRequest } from "../../utils/api";
import { toast } from "react-toastify";

export default function User() {
    const { userId } = useParams();
    const { data: user } = useData(`user/${userId}`)
    const auth = useAuth();
    const [inputs, setInputs] = useState({
        displayName: '',
        bio: ''
    })

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

    async function updateProfile(e) {
        e.preventDefault();
        try {
            await apiRequest(`${API_URL}/user/${userId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(inputs)
            })
            location.reload()
        } catch (error) {
            console.error(error)
            error.details.forEach((e) => {
                toast.error(e.msg)
            })
        }
    }

    if (!user) return 'Loading user details...'

    return (
        <div className='user'>
            <div className='details'>
                <h2>{user.displayName}</h2>
                <p>@{user.username}</p>
                <p>Member since {new Date(user.joined).toLocaleDateString()}</p>
                <p>Currently {user.status}</p>
                {user.bio && (
                    <div>
                        <h3>Bio:</h3>
                        {user.bio}
                    </div>
                )}
            </div>
            {auth.user._id === user._id && (
                <div className='edit'>
                    <h2>Edit profile:</h2>
                    <form action="" method="post" onSubmit={updateProfile}>
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
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>    
    )
}