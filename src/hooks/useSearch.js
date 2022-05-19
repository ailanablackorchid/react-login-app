import { useMemo } from "react";

export const useUsers = (users, query) => {
  const searchedUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  return searchedUsers;
};
