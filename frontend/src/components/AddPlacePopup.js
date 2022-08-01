import React from 'react';
import PopupWithForm from './PopupWithForm';

// =====>
function AddCardPopup(props) {
    // Inputs
    const [cardTitle, setCardTitle] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    // Hamdlers
    function handleCardTitleChange(evt) {
        setCardTitle(evt.target.value);
    }

    function handleCardLinkChange(evt) {
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddCard({
            name: cardTitle,
            link: cardLink,
        });
    }

    // Mounting
    React.useEffect(() => {
        setCardTitle('');
        setCardLink('');
    }, [props.isOpen]);

    // JSX
    return (
        <PopupWithForm name='add-card' title='New Place' saveButtonTitle='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id='card-input'
                className='form__input form__input_type_card-title'
                type='text'
                name='card-title'
                placeholder='Title'
                value={cardTitle}
                required
                minLength='1'
                maxLength='30'
                onChange={handleCardTitleChange}
            />
            <span id='card-input-error' className='form__input-error-message'></span>
            <input
                id='card-link-input'
                className='form__input form__input_type_card-link'
                type='url'
                name='card-link'
                placeholder='Image URL'
                value={cardLink}
                required
                onChange={handleCardLinkChange}
            />
            <span id='card-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default AddCardPopup;