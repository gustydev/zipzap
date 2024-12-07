import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleInputChange from "../../utils/handleInputChange";
import { Link } from "react-router-dom";
import { registerUser } from "../../utils/apiRequests";

export default function Register() {
    const [registerInput, setRegisterInput] = useState({
        username: '', 
        password: '',
        confirmPassword: '',
        displayName: ''
    })
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        registerUser(registerInput, navigate)
    }

    return (
        <div className='register'>
            <h2>Create an account</h2>
            <form action="" method='post' onSubmit={handleSubmit} className="authForm">
                <div className="formGroup">
                    <label htmlFor="username">Username*</label>
                    <input onChange={(e) => {handleInputChange(e, setRegisterInput)}} required type="text" name='username' id='username' maxLength={30} minLength={4}/>
                </div>
                <div className="formGroup">
                    <label htmlFor="displayName">Display name</label>
                    <input onChange={(e) => {handleInputChange(e, setRegisterInput)}} type="text" id='displayName' name='displayName' minLength={2} maxLength={30}/>
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password*</label>
                    <input onChange={(e) => {handleInputChange(e, setRegisterInput)}} required type="password" id='password' name='password' minLength={8}/>
                </div>
                <div className="formGroup">
                    <label htmlFor="confirmPassword">Confirm password*</label>
                    <input onChange={(e) => {handleInputChange(e, setRegisterInput)}} required type="password" id='confirmPassword' name='confirmPassword' minLength={8}/>
                </div>
                <input type="submit" value="Submit" className='btn btn-primary'/>
            </form>
            <Link to='/'>
                <button className='btn btn-outline-secondary'> 
                    Return to login page
                </button>
            </Link>
        </div>
    )
}