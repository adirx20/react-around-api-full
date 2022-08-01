import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from '../components/Card';

// =====>
function Main(props) {
    // CURRENT USER CONTEXT
    const currentUser = React.useContext(CurrentUserContext);

    // FUNCTIONS
    function handleImage() {
        props.onCardClick();
    }

    // JSX
    return (

        <main className='content'>

            <section className='profile'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src={currentUser.avatar} alt={`${currentUser.name} Avatar`} />
                    <div className='profile__avatar-overlay'></div>
                    <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={props.onEditAvatarClick}></button>
                </div>
                <div className='profile__info-container'>
                    <h1 className='profile__name'>{currentUser.name}</h1>
                    <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={props.onEditProfileClick}></button>
                    <p className='profile__profession'>{currentUser.about}</p>
                </div>
                <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={props.onAddCardClick}></button>
            </section>

            <section className='elements'>
                {
                    props.cards.map((element) => (
                        <Card
                            card={element} key={element._id}
                            onCardClick={props.onImageClick}
                            renderImage={handleImage}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))
                }
            </section>

        </main>

    );
}
// <=====

export default Main;