import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, API_URL } from "../../utils/api";
import { toast } from "react-toastify";

export default function Register() {
    const [registerInput, setRegisterInput] = useState({
        username: '', 
        password: '',
        confirmPassword: '',
        displayName: ''
    })
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await apiRequest(`${API_URL}/user/register`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerInput)
            })
            
            alert(`user ${registerInput.username} sucessfully registered! proceed to log in`)
            navigate('/login');
        } catch (errors) {
            errors.details.forEach((e) => {
                toast.error(e.msg);
                // instead of toasting everything i can make it fancy and highlight the fields with errors
            })
            setErrors(errors)
        }
    }

    return (
        <>
        <form action="" method='post' onSubmit={(e) => { handleSubmit(e) }}>
            <h2>Register</h2>
            <label htmlFor="username">Username*: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="text" name='username' id='username'/>
            <label htmlFor="password">Password*: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="password" id='password' name='password'/>
            <label htmlFor="confirmPassword">Confirm password*: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="password" id='confirmPassword' name='confirmPassword'/>
            <label htmlFor="displayName">Display name (optional):</label>
            <input onChange={(e) => {handleInputChange(e)}} type="text" id='displayName' name='displayName'/>
            <input type="submit" value="submit" />
        </form>
        </>
    )
}