import React, { createContext, useState, useContext } from "react";

const SidebarTogglerContext = createContext();

export const SidebarToggler = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <SidebarTogglerContext.Provider value={{ sidebarVisible, toggleSidebar }}>
      {children}
    </SidebarTogglerContext.Provider>
  );
};

export const useSidebarToggler = () => {
  const context = useContext(SidebarTogglerContext);
  if (!context) {
    throw new Error(
      "useSidebarToggler must be used within a SidebarTogglerProvider"
    );
  }
  return context;
};
