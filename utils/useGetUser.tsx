import React, { useState, useEffect } from "react";
import { useMeQuery } from "../src/generated/graphql";
import { useStateValue } from "../context/StateProvider";
import { LoadingScreen } from "../components";

const useGetUser = () => {
  const [qid, setQid] = useState<string>("");

  useEffect(() => {
    setQid(localStorage.getItem("qid") || "");
  }, []);

  const [{ fetching, data }] = useMeQuery({
    variables: { token: qid },
  });

  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (!fetching && data?.me) {
      dispatch({
        type: "SET_USER",
        value: data.me,
      });
    }
  }, [dispatch]);

  const username = state.user?.username;

  return [username];
};

export default useGetUser;
