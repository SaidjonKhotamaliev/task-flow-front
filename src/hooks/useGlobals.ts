import { createContext, useContext } from "react";
import { User } from "../libs/types/user";

interface GlobalInterface {
  authMember: User | null;
  setAuthMember: (member: User | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("UseGlobals within Provideer");
  return context;
};
