import React, { createContext, useContext, useState } from 'react';
import RouteComponent from './components/RouteComponent';

export type userType = {
  loggedIn: boolean
  setLoggedIn: (l: boolean) => void
}

export const UserContext = createContext<userType>({
  loggedIn: false,
  setLoggedIn: () => {}
})

export const useUserContext = () => useContext(UserContext)

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [forceUpdate, setForceUpdate] = useState(0)

  return (
    <UserContext.Provider value = {{loggedIn, setLoggedIn}}>
      <RouteComponent />
    </UserContext.Provider>
  );
};

export default App;