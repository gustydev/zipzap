import { apiRequest, API_URL } from "./api";
import { toast } from "react-toastify";

export async function registerUser(data, navigate) {
    try {
        await apiRequest(`${API_URL}/user/register`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        
        toast.success(`User ${data.username} sucessfully registered! Proceed to log in`)
        navigate('/login');
    } catch (err) {
        // Only toast error messages if trying to register a non demo account
        if (!data.demo) {
            err.details.forEach((e) => {
                toast.error(e.msg);
            })
        }
    }
}