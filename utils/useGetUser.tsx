import { useState, useEffect, useMemo } from "react";
import { useMeQuery, MeQuery } from "../src/generated/graphql";
import { CombinedError } from "urql";

type getUserHookType<T, E> = [T | undefined, boolean, E | undefined];

type getUserHookReturnType = getUserHookType<MeQuery["me"], CombinedError>;

const useGetUser = (): getUserHookReturnType => {
  const [qid, setQid] = useState<string>("");

  useEffect(() => {
    setQid(localStorage.getItem("qid") || "");
  }, []);

  const [{ fetching, data, error }] = useMeQuery({
    variables: { token: qid },
  });

  const user = data?.me;

  const resArray: getUserHookReturnType = [user, fetching, error];

  return useMemo<getUserHookReturnType>(() => resArray, resArray);
};

export default useGetUser;
