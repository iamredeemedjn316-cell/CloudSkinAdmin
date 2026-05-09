import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "practitioner" | "receptionist";

export interface CurrentUser {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  currentUser: CurrentUser;
  setCurrentUser: (u: CurrentUser) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  notificationCount: number;
}

const defaultUser: CurrentUser = {
  name: "Admin User",
  email: "admin@cloudskin.com",
  role: "admin",
  roleLabel: "Admin",
  initials: "AU",
};

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUser: defaultUser,
  setCurrentUser: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  notificationCount: 5,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultUser);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        sidebarCollapsed,
        setSidebarCollapsed,
        notificationCount: 5,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
