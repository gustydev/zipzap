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
            
            toast.success(`User ${registerInput.username} sucessfully registered! Proceed to log in`)
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
        <form action="" method='post' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="username">Username*: </label>
            <input onChange={handleInputChange} required type="text" name='username' id='username' maxLength={30} minLength={4}/>
            <label htmlFor="password">Password*: </label>
            <input onChange={handleInputChange} required type="password" id='password' name='password' minLength={8}/>
            <label htmlFor="confirmPassword">Confirm password*: </label>
            <input onChange={handleInputChange} required type="password" id='confirmPassword' name='confirmPassword' minLength={8}/>
            <label htmlFor="displayName">Display name (optional):</label>
            <input onChange={handleInputChange} type="text" id='displayName' name='displayName' minLength={2} maxLength={30}/>
            <input type="submit" value="submit" />
        </form>
        </>
    )
}