import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import { User } from "../libs/types/user";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookie = new Cookies();
  if (!cookie.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = useState<User | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  console.log("==========>>>>>>>>", authMember);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
