import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../components/UserForm";
import { useFetching } from "../hooks/useFetching";
import PatchService from "../API/PatchService";

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

  const token = useSelector((state) => state.auth.token);

  const { first_name, last_name, email } = formData;

  const [fetchUpdate, isLoading, updateError] = useFetching(
    async (formData) => {
      const response = await PatchService.updateUser(formData, token);
      const json = await response.json();
      alert("user was updated on " + json.updatedAt);
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
    dispatch({ type: "EDIT_USER", payload: formData });
    fetchUpdate(first_name, last_name, email);
    navigate("/users/");
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
        buttonName={"UPDATE USER"}
      />
    </div>
  );
}

export default EditUser;
