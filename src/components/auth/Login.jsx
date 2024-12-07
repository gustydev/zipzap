import { Link, Navigate } from "react-router-dom"
import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import handleInputChange from "../../utils/handleInputChange";
import { registerUser } from "../../utils/apiRequests";

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

    async function demoLogin() {
        const data = {
            username: import.meta.env.VITE_DEMO_USERNAME,
            password: import.meta.env.VITE_DEMO_PASS,
            confirmPassword: import.meta.env.VITE_DEMO_PASS,
            displayName: 'Demo User',
            demo: true
        };

        // register demo account if it doesn't exist
        await registerUser(data)

        // then log in with it
        auth.userLogin(data)
    }

    if (auth.token) {
        // if user is already logged in, redirect to front page
        return <Navigate to='/' />
    }

    return (
        <div className='login'>
            <h2>Welcome to ZipZap!</h2>
            <form action="" method='post' onSubmit={(e) => {handleSubmit(e)}} className="authForm">
                <div className="formGroup mb-3">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => {handleInputChange(e, setLoginInput)}} required type="text" id='username' name='username' placeholder='Username' />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Passsword</label>
                    <input onChange={(e) => {handleInputChange(e, setLoginInput)}} required type="password" id='password' name='password' />
                </div>
                <input type="submit" value="Log in" className='btn btn-primary'/>
            </form>
            <button className="btn btn-outline-success" onClick={() => {demoLogin()}}>Try a demo account</button>
            <Link to='/register'>
                <button className="btn btn-outline-primary">
                    Create a new account
                </button>
            </Link>
        </div>
    )
}