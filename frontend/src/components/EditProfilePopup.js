import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from '../components/PopupWithForm';

// =====>
function EditProfilePopup(props) {
    // CURRENT USER CONTEXT
    const currentUser = React.useContext(CurrentUserContext);

    // INPUTS
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // HANDLERS
    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    // MOUNTING
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    // JSX
    return (
        <PopupWithForm name='edit-profile' title='Edit profile' saveButtonTitle='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id='name-input'
                className='form__input form__input_type_name'
                type='text'
                name='name'
                placeholder='Name'
                value={name || ''}
                required
                minLength='2'
                maxLength='40'
                onChange={handleNameChange}
            />
            <span id='name-input-error' className='form__input-error-message'></span>
            <input
                id='proffession-input'
                className='form__input form__input_type_profession'
                type='text'
                name='profession'
                placeholder='About me'
                value={description || ''}
                required
                minLength='2'
                maxLength='200'
                onChange={handleDescriptionChange} />
            <span id='proffession-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default EditProfilePopup;