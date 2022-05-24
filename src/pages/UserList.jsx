import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const allUsers = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.total_pages);
  const token = useSelector((state) => state.auth.token);

  //fetch data from API

  const [fetchUsers, isLoading, fetchUsersError] = useFetching(async (page) => {
    const response = await GetService.getUserList(page, token);
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

  return (
    <div>
      <div className={"logout"}>
        <button onClick={() => navigate("/create/", { state: props })}>
          ADD NEW USER
        </button>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <div className={"search"}>
          <section>Search</section>
          <input
            type="search"
            id="site-search"
            name="q"
            placeholder="Search..."
            filter={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button>Search</button>
        </div>
        {searchedUsers.length ? (
          <div>
            <h2>List of users</h2>
            <h5>Click on user to update</h5>
            {searchedUsers.map((user) => (
              <UserItem
                avatar={user.avatar}
                email={user.email}
                first_name={user.first_name}
                last_name={user.last_name}
                id={user.id}
                key={user.id}
              />
            ))}
          </div>
        ) : (
          <h2>No Users</h2>
        )}
        <div className={"last-element"} ref={lastElement}></div>
      </div>
    </div>
  );
}

export default UserList;
