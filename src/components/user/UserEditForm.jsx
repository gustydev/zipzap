export default function UserEditForm( {inputs, updateProfile, handleInputChange, handlePicChange, fileInput} ) {
    return (
        <form action="" method="post" onSubmit={updateProfile} encType="multipart/form-data">
            <label htmlFor="displayName">
                Display name:
                <input 
                    type="text" 
                    id='displayName' 
                    htmlFor='displayName' 
                    name='displayName' 
                    minLength={2} 
                    maxLength={30} 
                    placeholder='John Dough' 
                    value={inputs.displayName} 
                    onChange={handleInputChange}
                />
            </label>
            <label htmlFor="bio">
                Bio:
                <textarea 
                    id='bio' 
                    htmlFor='bio' 
                    name='bio' 
                    maxLength={200} 
                    placeholder='Describe yourself in 200 characters or less!' 
                    value={inputs.bio} 
                    onChange={handleInputChange}
                />
            </label>
            <label htmlFor="pic">
                Profile picture (max 3MB):
                <input
                    type='file'
                    htmlFor='pic'
                    id='pic'
                    name='pic'
                    onChange={handlePicChange}
                    ref={fileInput}
                />
            </label>
            <button type="submit">Save</button>
        </form>
    )
}