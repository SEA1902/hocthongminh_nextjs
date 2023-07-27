import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { getUserFromToken } from "@/app/features/users/usersApi";

function useFetchUserFromToken() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(getUserFromToken(token));
      }
    }
    fetchData();
  }, [dispatch]);

  return;
}

export default useFetchUserFromToken;
