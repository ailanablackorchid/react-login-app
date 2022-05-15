import { useDispatch } from "react-redux";
import UserItem from "../components/UserItem";
import { useEffect } from "react";

function UserList(props) {
  const dispatch = useDispatch();

  function logout() {
    window.localStorage.removeItem("authToken");
    dispatch({ type: "SET_IS_LOGGED", payload: false });
  }

  function addNewUser() {}

  var users = [];

  const getUserList = async () => {
    const response = await fetch("https://reqres.in/api/users?page=2", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      error: function (result, status) {
        console.log(result);
      },
    });

    let jsonUserList = response.json().data;
    console.log(jsonUserList);
    return jsonUserList;
  };

  useEffect(() => {
    users = getUserList();
    dispatch({ type: "ADD_MANY_USERS", payload: users });
  }, []);

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <div>
        <button onClick={addNewUser}>ADD NEW USER</button>
        <input type="search" id="site-search" name="q" />
        <button>Search</button>

        {users.map((user) => (
          <UserItem
            avatar={user.avatar}
            email={user.email}
            first_name={user.first_name}
            second_name={user.second_name}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
