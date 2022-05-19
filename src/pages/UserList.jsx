import { React } from "react";
import { useDispatch } from "react-redux";
import UserItem from "../components/UserItem";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import GetService from "../API/GetService";
import { useFetching } from "../hooks/useFetching";
import { useUsers } from "../hooks/useSearch";

function UserList(props) {
  const dispatch = useDispatch();

  const [current_page, setPage] = useState(1);
  const [filter_value, setFilterValue] = useState("");

  const allUsers = useSelector((state) => state.user.users);

  //fetch data from API

  const [fetchUsers, isLoading, fetchUsersError] = useFetching(async (page) => {
    const response = await GetService.getUserList(page);
    const json = await response.json();
    dispatch({ type: "ADD_MANY_USERS", payload: json.data });
  });

  useEffect(() => {
    fetchUsers(current_page);
  }, [current_page]);

  // search implementation

  const searchedUsers = useUsers(allUsers, filter_value);

  //   logout functionality
  function logout() {
    window.localStorage.removeItem("authToken");
    dispatch({ type: "SET_IS_LOGGED", payload: false });
  }

  //  addNewUser functionality
  function addNewUser() {}

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>
        <button onClick={addNewUser}>ADD NEW USER</button>
        <input
          type="search"
          id="site-search"
          name="q"
          filter={filter_value}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button>Search</button>
        {searchedUsers.length ? (
          <div>
            {searchedUsers.length}
            {searchedUsers.map((user) => (
              <UserItem
                avatar={user.avatar}
                email={user.email}
                first_name={user.first_name}
                last_name={user.last_name}
                key={user.email}
              />
            ))}
          </div>
        ) : (
          <div>No Users</div>
        )}
      </div>
    </div>
  );
}

export default UserList;
