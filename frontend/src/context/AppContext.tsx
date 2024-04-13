import React, { createContext, useContext, } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
// import { loadStripe, Stripe } from "@stripe/stripe-js";



type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);


export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};