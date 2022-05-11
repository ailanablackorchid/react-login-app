import {useState, useEffect} from 'react'

function Login(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <section>
            Login
        </section>
        <form onSubmit={onSubmit}>
            <input
                type='text'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your e-mail'
                onChange={onChange}
            />
            <input
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
            />
            <button type='submit'>LOGIN</button>
        </form>
        </>
    );
}

export default Login;