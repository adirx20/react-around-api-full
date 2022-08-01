import React from 'react';

// =====>
function PopupWithForm(props) {
    // JSX
    return (

        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button className='popup__close-button button-effect' type='button' aria-label='close' onClick={props.onClose}></button>
                <h2 className='popup__title'>{props.title}</h2>
                <form className='form' name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className='form__save-button' type='submit'>{props.saveButtonTitle}</button>
                </form>
            </div>
        </div>

    );
}
// <=====

export default PopupWithForm;