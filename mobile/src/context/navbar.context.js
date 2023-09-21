import { createContext, useState } from "react";

export const NavbarContext = createContext({
  visible: true,
  setVisible: (visible) => {},
  title: (route) => "",
  setTitle: (title, route) => {},
});

export const NavbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState({});

  const handleSetTitle = (title, route) => {
    setTitle((prev) => ({ ...prev, [route]: title }));
  };

  return (
    <NavbarContext.Provider
      value={{
        visible,
        setVisible,
        title: (route) => title[route] || "",
        setTitle: handleSetTitle,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
