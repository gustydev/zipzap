import { useState } from "react"
import { API_URL, apiRequest } from "../../../utils/api";
import useAuth from "../../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import handleInputChange from "../../../utils/handleInputChange";

export default function NewChat( {newFormActive, setNewFormActive} ) {
    const auth = useAuth();
    const [inputs, setInputs] = useState({
        title: '',
        public: false
    })
    const nav = useNavigate();

    const handlePublicChange = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            public: !prevInputs.public
        }));
    }

    async function createChat(e) {
        e.preventDefault();
        try {
            const res = await apiRequest(`${API_URL}/chat`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            toast.success(res.msg)
            
            setInputs({title: '', public: false})
            setNewFormActive(!newFormActive)

            nav(`/chat/${res.chat._id}`)
        } catch (err) {
            toast.error(err.message);
            err.details?.forEach((e) => {
                toast.error(e.msg);
            })
        }
    }

    return (
        <div className='newChat'>
        {newFormActive && (
            <form action="" method="post" onSubmit={createChat} >
                <input type="text" id='title' name='title' minLength={1} maxLength={50} placeholder='Chat title' onChange={(e) => {handleInputChange(e, setInputs)}}/>
                <div className="formGroup">
                    <label htmlFor="public">Public?</label>
                    <input id='public' type="checkbox" name='public' value={inputs.public} onChange={handlePublicChange}/>
                </div>
                <button type="submit" className='btn btn-primary'>Create</button>
            </form>
        )}
        <button className={'btn ' + (newFormActive ? 'btn-danger' : 'btn-primary')} onClick={() => {setNewFormActive((curr) => !curr)}}>
            {newFormActive ? 'Cancel' : 'New chat'}
        </button>
        </div>
    )
}