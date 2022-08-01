// =====>
function PopupWithTip({ isOpen, onClose, ...props }) {
    // JSX
    return (
        <div className={`popup popup_type_tip ${isOpen ? 'popup_opened' : ''}`}>
            <figure className='popup__frame'>
                <div className='popup__tip-container'>
                    <button className='popup__close-button button-effect' type='button' aria-label='close' onClick={onClose}></button>
                    <img
                        className='popup__tip-icon'
                        src={props.tipIcon}
                        alt={props.tipText}
                    />
                    <p className='popup__tip-text'>{props.tipText}</p>
                </div>
            </figure>
        </div>

    );
}
// <=====

export default PopupWithTip;