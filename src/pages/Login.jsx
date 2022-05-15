import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

function Login(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }


    const login = async (formData) => {
        const {email, password} = formData;
        const response =  await fetch('https://reqres.in/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({                
                "email": email,
                "password": password
            }),
            error: function (result, status) {
                console.log(result);
            }
        })

        let json = await response.json();
        const token = json.token;
        if (token){
            console.log(token);
            dispatch({type: "SET_TOKEN", payload: token});
            dispatch({type: "SET_IS_LOGGED", payload: true});
        }
        window.localStorage.setItem("authToken", token);
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