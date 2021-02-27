import { dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
} from "../src/generated/graphql";
import { cacheExchange } from "@urql/exchange-graphcache";
import betterUpdateQuery from "./betterUpdateQuery";

const __prod__ = process.env.NODE_ENV === "production";

export const CreateUrqlClient = (ssrExchange: any) => ({
  url: __prod__ ? process.env.API_URL : "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            return betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            return betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
