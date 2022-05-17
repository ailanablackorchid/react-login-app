import { React } from "react";
import { useDispatch } from "react-redux";
import UserItem from "../components/UserItem";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function UserList(props) {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [current_page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(10);
  const [filter_value, setFilterValue] = useState("");

  const dispatch = useDispatch();

  const userIds = useSelector((state) => state.user.userIds);

  //   const current_page = useSelector((state) => state.user.current_page);
  const per_page = useSelector((state) => state.user.per_page);
  const allUsers = useSelector((state) => state.user.users);
  //   const total_pages = useSelector((state) => state.user.total_pages);

  //   logout functionality

  function logout() {
    window.localStorage.removeItem("authToken");
    dispatch({ type: "SET_IS_LOGGED", payload: false });
  }

  //   get userList functionality

  const getUserList = async (current_page) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${current_page}`,
      {
        method: "GET",
        mode: "cors",
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
        error: function (result, status) {
          console.log(result);
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setData(json);
  };

  useEffect(() => {
    if (current_page <= total_pages) {
      getUserList(current_page);
      const response = data;
      console.log("response");
      console.log(response);
      if (response.data !== undefined) {
        if (Object.keys(userIds)) {
          const users = response.data.filter((user) => !(user.id in userIds));
        }
        dispatch({ type: "ADD_MANY_USERS", payload: response.data });
        setTotalPages(response.total_pages);
        setPage(current_page + 1);
      }
    }
  }, [current_page]);

  //   Pagination functionality

  const pages = [...Array(total_pages)];

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
        {/* <h1>
          {searchedPosts.map((user) => {
            <div key={user.email}>{user.email}</div>;
          })}
        </h1> */}

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
            <div>
              {pages.map((page, index) => (
                <button key={index} onClick={() => setPage(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>No Users</div>
        )}
      </div>
    </div>
  );
}

export default UserList;
