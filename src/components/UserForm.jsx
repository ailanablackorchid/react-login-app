import React from "react";

function UserForm(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          value={props.first_name}
          placeholder="Edit name"
          name="first_name"
          onChange={props.onChange}
          required
        ></input>
        <input
          type="text"
          value={props.last_name}
          name="last_name"
          placeholder="Edit last name"
          onChange={props.onChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          value={props.email}
          onChange={props.onChange}
          required
        ></input>

        <button type="submit">UPDATE</button>
        <button type="button" onClick={props.onClick}>
          CANCEL
        </button>
      </form>
    </div>
  );
}

export default UserForm;
