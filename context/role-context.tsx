"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Role = "admin" | "user" | undefined;

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
};

const STORAGE_KEY = "app-role";
const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const savedRole = window.localStorage.getItem(STORAGE_KEY);
    if (savedRole === "admin" || savedRole === "user") {
      return savedRole;
    }
    console.log(savedRole);

    return undefined;
  });

  const setRole = (nextRole: Role) => {
    setRoleState(nextRole);
    if (nextRole) {
      window.localStorage.setItem(STORAGE_KEY, nextRole);
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ role, setRole }), [role]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }

  return context;
}