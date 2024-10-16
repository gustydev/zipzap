import { useEffect, useState, useRef } from "react"
import { apiRequest, API_URL } from "../../utils/api"
import useAuth from "../../hooks/useAuth/useAuth"
import { toast } from "react-toastify"
import UserEditForm from "./UserEditForm"
import handleInputChange from "../../utils/handleInputChange"

export default function UserEdit( {user, socket}) {
    const [inputs, setInputs] = useState({
        displayName: '',
        bio: '',
        pic: null
    })
    const auth = useAuth();
    const fileInput = useRef(null);

    useEffect(() => {
        if (user) {
            setInputs({
                displayName: user.displayName || '',
                bio: user.bio || ''
            })
        }
    }, [user])

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
            const res = await apiRequest(`${API_URL}/user/${auth.user._id}`, {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                body: data
            })
            socket.emit('updateProfile', res)
            toast.success(res.msg)
            fileInput.current.value = null;
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

    return (
        <div className='edit'>
            <h2>Edit profile:</h2>
            <UserEditForm 
                inputs={inputs} 
                updateProfile={updateProfile} 
                handleInputChange={handleInputChange} 
                handlePicChange={handlePicChange}
                fileInput={fileInput}    
                setInputs={setInputs}
            />
        </div>
    )
}