import { Link } from "react-router-dom"
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
    const [loginInput, setLoginInput] = useState({username: '', password: ''})
    const auth = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (loginInput.username !== '' && loginInput.password !== '') {
            auth.userLogin(loginInput)
            return;
        }
        toast.error('Invalid inputs')
    }

    return (
        <>
        <form action="" method='post' onSubmit={(e) => {handleSubmit(e)}}>
            <h2>Welcome to Messenger! Proceed to log in</h2>
            <label htmlFor="username">Username: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="text" id='username' name='username' placeholder='Username' />
            <label htmlFor="password">Passsword: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="password" id='password' name='password' />
            <input type="submit" value="submit" />
        </form>
        <button>Try a demo account</button>
        </>
    )
}