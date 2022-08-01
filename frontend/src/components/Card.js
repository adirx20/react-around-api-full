import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

// =====>
function Card(props) {
    // CURRENT USER CONTEXT
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;

    // STYLE
    const imageStyle = {
        backgroundImage: `url(${props.card.link})`,
    };

    // CARD
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'} button-effect`
    );
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    // FUNCTIONS
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
        console.log('dddd', props.card);
    }

    function getImage() {
        props.onCardClick(props.card);
    };

    return (

        <article className='element'>
            <div className='element__image' style={imageStyle} onMouseDown={getImage} onClick={props.renderImage}></div>
            <button className={cardDeleteButtonClassName} aria-label='delete' onClick={handleDeleteClick}></button>
            <div className='element__bar'>
                <h2 className='element__title'>{props.card.name}</h2>
                <div className='element__likes-container'>
                    <button className={cardLikeButtonClassName} type='button' aria-label='like' onClick={handleLikeClick}></button>
                    <span className='element__likes-count'>{props.card.likes.length}</span>
                </div>
            </div>
        </article>

    );
}
// <=====

export default Card;