import React, { useState } from 'react';


export const AppStateContext = React.createContext();

const AppStateProvider = props => {
  const [userState,setUserState]=useState(1) //Student=1, Teacher=2 and HOD=3
  const contextValue={user:userState,setUser:(value)=>setUserState(value)}

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider 