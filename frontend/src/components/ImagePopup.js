// =====>
function ImagePopup(props) {
    // JSX
    return (

        <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className='popup__frame'>
                <button className='popup__close-button button-effect' type='button' aria-label='close' onClick={props.onClose}></button>
                <img className='popup__image' src={props.imageLink} alt={props.imageCaption} />
                <figcaption className='popup__caption'>{props.imageCaption}</figcaption>
            </figure>
        </div>

    );
}
// <=====

export default ImagePopup;