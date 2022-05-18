import { React } from "react";
import { useDispatch } from "react-redux";
import UserItem from "../components/UserItem";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import GetService from "../API/GetService";
import { useFetching } from "../hooks/useFetching";

function UserList(props) {
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [current_page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(10);
  const [filter_value, setFilterValue] = useState("");

  const userIds = useSelector((state) => state.user.userIds);
  const allUsers = useSelector((state) => state.user.users);

  const [fetchUsers, isLoading, fetchUsersError] = useFetching(async (page) => {
    const response = await GetService.getUserList(page);
    const json = await response.json();
    console.log(json);
    return json;
  });

  //   logout functionality
  function logout() {
    window.localStorage.removeItem("authToken");
    dispatch({ type: "SET_IS_LOGGED", payload: false });
  }

  useEffect(() => {
    fetchUsers(current_page);
  }, [current_page]);

  const userChecker = () => {
    if (current_page <= total_pages) {
      const response = data;
      console.log("response");
      console.log(response);
      if (response.data !== undefined) {
        if (Object.keys(userIds)) {
          const users = response.data.filter((user) => !(user.id in userIds));
        }
        dispatch({ type: "ADD_MANY_USERS", payload: users });
        setTotalPages(response.total_pages);
        setPage(current_page + 1);
      }
    }
  };

  //   search functionality

  const useSearchedPosts = (allUsers, filter_value) => {
    const sortedAndSearchedArray = useMemo(() => {
      return allUsers.filter(
        (user) =>
          user.first_name.toLowerCase().includes(filter_value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(filter_value.toLowerCase()) ||
          user.email.toLowerCase().includes(filter_value.toLowerCase())
      );
    });
    // setUsers(result);
  };

  const searchedPosts = useSearchedPosts(allUsers, filter_value);

  function searchUser(value) {
    setFilterValue(value);

    console.log(searchedPosts);
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
          onChange={(e) => searchUser(e.target.value)}
        />
        <button>Search</button>

        {users.length ? (
          <div>
            {users.length}
            {users.map((user) => (
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
