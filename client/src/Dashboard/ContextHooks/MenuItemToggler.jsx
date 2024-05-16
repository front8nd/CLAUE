import React, { useContext, createContext, useState } from "react";
const MenuItemContext = createContext();
export default function MenuItemToggler({ children }) {
  const [MenuItemToggler, setMenuItemToggler] = useState(false);
  const togglerMenuItem = () => {
    setMenuItemToggler(!MenuItemToggler);
  };
  return (
    <MenuItemContext.Provider value={{ MenuItemToggler, togglerMenuItem }}>
      {children}
    </MenuItemContext.Provider>
  );
}

export const useMenuItemToggler = () => {
  const context = useContext(MenuItemContext);
  if (!context) {
    throw new Error("useMenuItemToggler must be used within a MenuItemContext");
  }
  return context;
};
