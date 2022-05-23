import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserForm from "../components/UserForm";

function EditUser() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
  });

  const { first_name, last_name, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT_USER", payload: formData });
  };

  const onClick = () => {
    navigate("/users/");
  };

  return (
    <div>
      <UserForm
        onSubmit={onSubmit}
        onChange={onChange}
        onClick={onClick}
        first_name={first_name}
        last_name={last_name}
        email={email}
      />
    </div>
  );
}

export default EditUser;
