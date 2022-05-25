import React from "react";

function UserForm(props) {
  return (
    <div className="form">
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          value={props.first_name}
          placeholder="First name"
          name="first_name"
          onChange={props.onChange}
          required
        ></input>
        <input
          type="text"
          value={props.last_name}
          name="last_name"
          placeholder="Last name"
          onChange={props.onChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={props.email}
          onChange={props.onChange}
          required
        ></input>

        <button
          type="submit"
          disabled={!(props.email && props.last_name && props.first_name)}
        >
          {props.buttonName}
        </button>
        <button type="button" onClick={props.onClick}>
          CANCEL
        </button>
      </form>
    </div>
  );
}

export default UserForm;
