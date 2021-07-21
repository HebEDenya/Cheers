import React from 'react';

//create the context okay ?

export const Context = React.createContext<any>(undefined);

//Provider to get the values and evoid repeated code

export const TheProvider:React.FC = ({children}) => {
 const [userValue, setuserValue] = React.useState({
     user_id: 1,
     userInfo : [],
 });

  //the store object that we will use 
  let state = {
      userValue,
      setuserValue,
  }
 return <Context.Provider value={state}> {children} </Context.Provider>
}

export default Context;