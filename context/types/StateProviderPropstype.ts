import { Reducer, Dispatch } from "react";
import { ContextDefaultType } from "./defaultValue";
import { Product, MeQuery } from "../../src/generated/graphql";

export interface Actions {
  type: string;
  value: any;
}

export type StateProviderPropstype = {
  reducer: Reducer<ContextDefaultType, Actions>;
  initialState: ContextDefaultType;
};

export interface InitContextProps {
  state: ContextDefaultType;
  dispatch: Dispatch<Actions>;
}
