import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetService from "../API/GetService";
import UserItem from "../components/UserItem";
import { useFetching } from "../hooks/useFetching";
import { useUsers } from "../hooks/useSearch";
import { useObserver } from "../hooks/useObserver";

function UserList(props) {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const lastElement = useRef();

  const allUsers = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.total_pages);

  //fetch data from API

  const [fetchUsers, isLoading, fetchUsersError] = useFetching(async (page) => {
    const response = await GetService.getUserList(page);
    const json = await response.json();
    dispatch({ type: "ADD_MANY_USERS", payload: json.data });
    dispatch({ type: "SET_PAGES_TOTAL", payload: json.total_pages });
  });

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // search implementation

  const searchedUsers = useUsers(allUsers, filterValue);

  //   logout implementation
  function logout() {
    window.localStorage.removeItem("authToken");
    dispatch({ type: "SET_IS_LOGGED", payload: false });
  }

  // observer

  useObserver(lastElement, currentPage < totalPages, isLoading, () => {
    setCurrentPage(currentPage + 1);
  });

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
          filter={filterValue}
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
        <div ref={lastElement}></div>
      </div>
    </div>
  );
}

export default UserList;
