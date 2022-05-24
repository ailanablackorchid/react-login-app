import React from "react";
import { useNavigate } from "react-router-dom";

function UserItem(props) {
  const navigate = useNavigate();
  return (
    <div className="user" onClick={() => navigate("/edit/", { state: props })}>
      <div>
        <img src={props.avatar} />
      </div>
      <div className="user-text">
        <p>
          {props.first_name} {props.last_name}
        </p>
        <p>{props.email}</p>
      </div>
    </div>
  );
}

export default UserItem;
