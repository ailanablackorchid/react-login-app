import { useState } from "react";
import { useDispatch } from "react-redux";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";

function Login(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [fetchLogin, isLoading, loginError] = useFetching(async (formData) => {
    const response = await PostService.login(formData);
    const json = await response.json();
    const token = json.token;
    if (token) {
      dispatch({ type: "SET_TOKEN", payload: token });
      dispatch({ type: "SET_IS_LOGGED", payload: true });
    }
    window.localStorage.setItem("authToken", token);
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchLogin(formData);
  };

  return (
    <div className="form">
      <section>Login</section>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your e-mail"
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChange}
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
