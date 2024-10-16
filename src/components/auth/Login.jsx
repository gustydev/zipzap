import { Link, Navigate } from "react-router-dom"
import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import handleInputChange from "../../utils/handleInputChange";

export default function Login() {
    const [loginInput, setLoginInput] = useState({username: '', password: ''})
    const auth = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (loginInput.username !== '' && loginInput.password !== '') {
            auth.userLogin(loginInput)
            return;
        }
        toast.error('Invalid inputs')
    }

    if (auth.token) {
        // if user is already logged in, redirect to front page
        return <Navigate to='/' />
    }

    return (
        <div className='login'>
        <form action="" method='post' onSubmit={(e) => {handleSubmit(e)}}>
            <h2>Welcome to Messenger! Proceed to log in</h2>
            <label htmlFor="username">Username: </label>
            <input onChange={(e) => {handleInputChange(e, setLoginInput)}} required type="text" id='username' name='username' placeholder='Username' />
            <label htmlFor="password">Passsword: </label>
            <input onChange={(e) => {handleInputChange(e, setLoginInput)}} required type="password" id='password' name='password' />
            <input type="submit" value="submit" />
        </form>
        <button>Try a demo account</button>
        <Link to='/register'>Create a new account</Link>
        </div>
    )
}