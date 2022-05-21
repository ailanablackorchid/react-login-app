import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function EditForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state;
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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={first_name}
          placeholder="Edit name"
          name="first_name"
          onChange={onChange}
          required
        ></input>
        <input
          type="text"
          value={last_name}
          name="last_name"
          placeholder="Edit last name"
          onChange={onChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        ></input>

        <button type="submit">UPDATE</button>
      </form>
    </div>
  );
}

export default EditForm;
