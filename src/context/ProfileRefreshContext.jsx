// src/context/ProfileRefreshContext.js
import { createContext, useContext, useState } from "react";

const ProfileRefreshContext = createContext();

export const useProfileRefresh = () => useContext(ProfileRefreshContext);

export const ProfileRefreshProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => !prev);

  return (
    <ProfileRefreshContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </ProfileRefreshContext.Provider>
  );
};
