import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// =====>
function Register(props) {
    // Registration state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Registration functions
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleRegister(email, password);
    }

    // JSX
    return (
        <section className='auth'>
            <form
                className='auth__form'
                onSubmit={handleSubmit}
            >
                <div className='auth__container'>
                    <h1 className='auth__title'>Sign up</h1>
                    <input
                        className='auth__input'
                        id='input-email'
                        type='email'
                        name='email'
                        value={props.userEmail}
                        onChange={(evt) => setEmail(evt.target.value)}
                        placeholder='Email'
                        required
                    />
                    <input
                        className='auth__input'
                        id='input-password'
                        type='password'
                        name='password'
                        value={props.password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button
                        className='auth__submit-button'
                        type='submit'
                    >
                        Sign up
                    </button>
                    <Link className='auth__link' to='/signin'>
                        Already a member? Log in here!
                    </Link>
                </div>

            </form>
        </section>
    )
}
// <=====

export default Register;
