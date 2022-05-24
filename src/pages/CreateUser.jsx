import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import UserForm from "../components/UserForm";

function CreateUser(props) {
  const [formData, setFormData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIds = useSelector((state) => state.user.userIds);
  const token = useSelector((state) => state.auth.token);

  const { first_name, last_name, email } = formData;

  const [fetchCreate, isLoading, createError] = useFetching(
    async (formData) => {
      const response = await PostService.createUser(formData, token);
      const json = await response.json();
    }
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var id = Math.floor(Math.random() * 1000 + 1);
    while (id in userIds) {
      id = Math.floor(Math.random() * 1000 + 1);
    }
    setFormData({ ...formData, id: id });
    dispatch({ type: "ADD_USER", payload: formData });
    fetchCreate(formData);
    alert("User was created");
    navigate("/users/");
  };

  const onClick = () => {
    navigate("/users/");
  };

  return (
    <div>
      <UserForm
        onChange={onChange}
        onClick={onClick}
        first_name={first_name}
        last_name={last_name}
        email={email}
        onSubmit={onSubmit}
        buttonName={"CREATE USER"}
      />
    </div>
  );
}

export default CreateUser;
