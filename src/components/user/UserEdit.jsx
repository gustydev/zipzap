import { useEffect, useState, useRef } from "react"
import { apiRequest, API_URL } from "../../utils/api"
import useAuth from "../../hooks/useAuth/useAuth"
import { toast } from "react-toastify"
import UserEditForm from "./UserEditForm"
import handleInputChange from "../../utils/handleInputChange"
import { redirect } from "react-router-dom"

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

    async function deleteAccount() {
        const userAgree = confirm('Are you sure you want to delete your account and all of its messages? This cannot be undone!!')
        if (userAgree) {
            try {
                await apiRequest(`${API_URL}/user/${auth.user._id}`, {
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                })
                auth.logOut();
                redirect('/');
            } catch (err) {
                console.error(err)
                toast.error(err.message)
            }
        }
    }

    return (
        <div className='userEdit'>
            <h2>Edit:</h2>
            <UserEditForm 
                inputs={inputs} 
                updateProfile={updateProfile} 
                handleInputChange={handleInputChange} 
                handlePicChange={handlePicChange}
                fileInput={fileInput}    
                setInputs={setInputs}
            />
            <h2 className='mt-5'>Danger zone</h2>
            <button className='btn btn-danger' onClick={deleteAccount}>Delete account</button>
        </div>
    )
}