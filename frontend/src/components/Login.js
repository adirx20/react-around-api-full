import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// =====>
function Login(props) {
    // Login state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login functions
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleLogin(email, password);
    }

    // JSX
    return (
        // need to complete here
        <section className='auth'>
            <form
                className='auth__form'
                onSubmit={handleSubmit}
            >
                <div className='auth__container'>
                    <h1 className='auth__title'>Log in</h1>
                    <input
                        className='auth__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                    <input
                        className='auth__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button
                        className='auth__submit-button'
                        type='submit'
                    >
                        Log in
                    </button>
                    <Link className='auth__link' to='/signup'>
                        Not a member yet? Sign up here!
                    </Link>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Login;