import React, { useReducer } from 'react';
import AppStateContext from './contexts/AppStateContext';
import appReducer from './reducers/appReducer';
import initialState from './initialState/initialState';

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
