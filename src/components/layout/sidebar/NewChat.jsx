import { useState } from "react"
import { API_URL, apiRequest } from "../../../utils/api";
import useAuth from "../../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function NewChat( {newFormActive, setNewFormActive} ) {
    const auth = useAuth();
    const [inputs, setInputs] = useState({
        title: '',
        public: false
    })
    const nav = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
    };

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
        } catch (error) {
            console.error(error)
            error.details.forEach((e) => {
                toast.error(e.msg);
            })
        }
    }

    return (
        <>
        {newFormActive && (
            <form action="" method="post" onSubmit={createChat}>
                <input type="text" name='title' min={1} max={50} placeholder='Chat title' onChange={handleInputChange}/>
                <label htmlFor="public">
                    <p>Public?</p>
                    <input id='public' type="checkbox" name='public' value={inputs.public} onChange={handlePublicChange}/>
                </label>
                <button type="submit">Create</button>
            </form>
        )}
        <button onClick={() => {setNewFormActive((curr) => !curr)}}>
            {newFormActive ? 'Cancel' : 'New chat'}
        </button>
        </>
    )
}