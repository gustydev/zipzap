import { Link } from "react-router-dom"

export default function FetchError( {data, id} ) {
    return (
        <div className='fetchError'>
            <h2>Error</h2>
            <p>Could not find data for {data} of ID "{id}". Mostly likely, this {data} doesn't exist at all!</p>
            <Link to='/'><button className="btn btn-secondary">Return to homepage</button></Link>
        </div>
    )
}