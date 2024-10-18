export default function UserEditForm( {inputs, updateProfile, handleInputChange, handlePicChange, fileInput, setInputs} ) {
    return (
        <form action="" method="post" onSubmit={updateProfile} encType="multipart/form-data">
            <div className='mb-3'>
                <label htmlFor="displayName" className='form-label'>Display name: </label>
                    <input
                        className='form-control'
                        type="text"
                        id='displayName'
                        htmlFor='displayName'
                        name='displayName'
                        minLength={2}
                        maxLength={30}
                        placeholder='John Dough'
                        value={inputs.displayName}
                        onChange={(e) => {handleInputChange(e, setInputs)}}
                    />
            </div>
            <div className='mb-3'>
                <label htmlFor="bio" className='form-label'>Bio: </label>
                    <textarea
                        className='form-control'
                        id='bio'
                        htmlFor='bio'
                        name='bio'
                        maxLength={200}
                        placeholder='Describe yourself in 200 characters or less!'
                        value={inputs.bio}
                        onChange={(e) => {handleInputChange(e, setInputs)}}
                    />
            </div>
            <div className='mb-3'>  
                <label htmlFor="pic" className='form-label'>Profile picture (max 3MB): </label>
                    <input
                        className='form-control'
                        type='file'
                        htmlFor='pic'
                        id='pic'
                        name='pic'
                        onChange={handlePicChange}
                        ref={fileInput}
                    />
            </div>
            <button type="submit" className='btn btn-primary mb-3'>Save</button>
        </form>
    )
}