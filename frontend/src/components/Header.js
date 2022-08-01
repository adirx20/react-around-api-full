import { Link, useLocation } from 'react-router-dom';

// =====>
function Header({ loggedIn, currentUser, headerStatus, logOut, ...props }) {
    // Location
    const location = useLocation();

    // JSX
    return (
        <header className='header'>
            <img
                className='header__logo'
                src={props.logo}
                alt='Around the U.S. logo'
            />
            {
                location.pathname === '/signup'
                    ? <Link className='header__link' to='/signin'>Log in</Link>
                    : location.pathname === '/signin'
                        ? <Link className='header__link' to='/signup'>Sign up</Link>
                        : location.pathname === '/'
                            ? <div className='header__user-container'>
                                <p className='header__user-email'>{currentUser.email}</p>
                                <button
                                    className='header__logout-button button-effect'
                                    type='button'
                                    onClick={logOut}
                                >
                                    Log Out
                                </button>
                            </div>
                            : ''
            }
        </header >

    );
}
// <=====

export default Header;