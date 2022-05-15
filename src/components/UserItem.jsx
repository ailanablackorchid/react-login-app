import React from "react";

function UserItem(props) {
  return (
    <div>
      <div>
        <img src={props.avatar} />
      </div>
      <div>
        <p>
          {props.first_name} {props.second_name}
        </p>
        <p>{props.email}</p>
      </div>
    </div>
  );
}

export default UserItem;
