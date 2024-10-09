import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
    <>
        <div>Oops! Page not found.</div>
        <div>Click <Link to='/'>here</Link> to return to main page</div>
    </>
    )
}