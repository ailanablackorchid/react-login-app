import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

// console.log(data);
// console.log(formData);
// console.log(userIds);
// dispatch({ type: "ADD_USER", payload: formData });

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

  const { first_name, last_name, email } = formData;

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
      console.log(id);
    }
    console.log("out of loop");
    console.log(id);
    setFormData({ ...formData, id: id });
    console.log(formData.id);
    dispatch({ type: "ADD_USER", payload: formData });
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
      />
    </div>
  );
}

export default CreateUser;
