import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

// =====>
function EditAvatarPopup(props) {
    // Avatar link state variable
    const [avatarLink, setAvatarLink] = React.useState('');

    // Handlers
    function handleLinkChange(evt) {
        setAvatarLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar(avatarLink);
    }

    // Mounting
    React.useEffect(() => {
        setAvatarLink('');
    }, [props.isOpen]);

    // JSX
    return (
        <PopupWithForm
            name='edit-avatar'
            title='Change profile picture'
            saveButtonTitle='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id='avatar-link-input'
                className='form__input form__input_type_avatar-link'
                type='url'
                name='avatar-link'
                placeholder='Image URL'
                value={avatarLink}
                onChange={handleLinkChange}
                required
            />
            <span id='avatar-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default EditAvatarPopup;