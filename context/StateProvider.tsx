import React, { createContext, useContext, useReducer } from "react";
import { ContextDefaultType } from "./types/defaultValue";
import {
  InitContextProps,
  StateProviderPropstype,
} from "./types/StateProviderPropstype";

export const initialState: ContextDefaultType = {
  basket: [],
  user: null,
};

// Prepares the dataLayer
export const StateContext = createContext<InitContextProps>(
  {} as InitContextProps
);

// Wrap our app and provide the Data layer
export const StateProvider: React.FC<StateProviderPropstype> = ({
  reducer,
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
